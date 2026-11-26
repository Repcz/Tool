/**
 * 阿里云 ECS 互联网流量面板 (Surge 面板 + 每日定时通知 + 阈值自动启停)
 *
 * 纯脚本实现阿里云 RPC 签名 (HMAC-SHA1), 直接调用 CDT / ECS API, 无需服务端中转
 * 参考: aliyun CDT ListCdtInternetTraffic + ECS DescribeInstances/StartInstances/StopInstances
 *
 * 统计口径与 Python 参考脚本一致:
 *   - 指标: CDT 互联网流量 (ListCdtInternetTraffic.TrafficDetails 求和, 字节)
 *   - 控制: 总流量 < 阈值 → 确保实例运行; ≥ 阈值 → 确保实例停止 (auto-action=true 时生效)
 *
 * 模块参数 (argument):
 *   ak / sk       阿里云 AccessKeyId / AccessKeySecret (需 CDT 只读 + ECS 查询/启停权限)
 *   region        实例所在区域 ID, 例 cn-hongkong
 *   instance-id   ECS 实例 ID
 *   quota         当月互联网流量配额 (GB), 用于计算百分比
 *   threshold     流量阈值 (GB), 达到后停止实例, 默认 180
 *   auto-action   是否允许脚本自动启停实例, 默认 false (仅展示)
 *   icon          面板图标名, 默认 cloud
 *   icon-color    图标颜色, 6位HEX(不含#), 默认 FF6A00
 *   ip-mode       IP 显示模式: full 完整 / mask 打码 / hide 隐藏, 默认 mask
 *   mode          panel=面板 / daily=每日通知
 */

const CDT_DOMAIN = 'cdt.aliyuncs.com';
const CDT_VERSION = '2021-08-13';
const ECS_VERSION = '2014-05-26';
const BYTES_PER_GB = 1024 ** 3;
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000;          // IP 地区反查缓存 24h
const GEO_CACHE_PREFIX = 'aliyun_geo_';             // 缓存 key 前缀
const NOTIFY_DAILY_KEY_PREFIX = 'aliyun_daily_';    // 日报去重 key 前缀

const PANEL_TITLE = 'Aliyun ECS';                   // 面板标题
const DEFAULT_ICON = 'cloud';                       // 默认面板图标
const DEFAULT_ICON_COLOR = '#FF6A00';               // 默认图标颜色
const ERROR_ICON = 'exclamationmark.triangle.fill'; // 错误态图标
const ERROR_COLOR = '#EF4444';                      // 错误态颜色

/* ================= SHA-1 / HMAC (纯 JS, 无外部依赖) ================= */

function rotl(x, n) { return ((x << n) | (x >>> (32 - n))) >>> 0; }

function utf8(str) {
  if (typeof str !== 'string') return str instanceof Uint8Array ? str : Uint8Array.from(str);
  const out = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.codePointAt(i);
    if (c > 0xffff) i++;
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return Uint8Array.from(out);
}

function concatBytes(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a); out.set(b, a.length);
  return out;
}

function sha1Bytes(bytes) {
  const ml = bytes.length;
  const total = (((ml + 8) >> 6) + 1) << 6;
  const buf = new Uint8Array(total);
  buf.set(bytes);
  buf[ml] = 0x80;
  const bitLen = ml * 8;
  const dv = new DataView(buf.buffer);
  dv.setUint32(total - 8, Math.floor(bitLen / 0x100000000));
  dv.setUint32(total - 4, bitLen >>> 0);

  let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
  const w = new Uint32Array(80);

  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(off + i * 4);
    for (let i = 16; i < 80; i++) {
      const n = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
      w[i] = rotl(n, 1);
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let i = 0; i < 80; i++) {
      let f, k;
      if (i < 20) { f = (b & c) | (~b & d); k = 0x5A827999; }
      else if (i < 40) { f = b ^ c ^ d; k = 0x6ED9EBA1; }
      else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
      else { f = b ^ c ^ d; k = 0xCA62C1D6; }
      const t = (rotl(a, 5) + f + e + k + w[i]) >>> 0;
      e = d; d = c; c = rotl(b, 30); b = a; a = t;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
  }

  const out = new Uint8Array(20);
  const odv = new DataView(out.buffer);
  [h0, h1, h2, h3, h4].forEach((v, i) => odv.setUint32(i * 4, v));
  return out;
}

function hmacSha1(key, msg) {
  let k = utf8(key);
  if (k.length > 64) k = sha1Bytes(k);
  const block = new Uint8Array(64);
  block.set(k);
  const iKey = new Uint8Array(64), oKey = new Uint8Array(64);
  for (let i = 0; i < 64; i++) { iKey[i] = block[i] ^ 0x36; oKey[i] = block[i] ^ 0x5c; }
  return sha1Bytes(concatBytes(oKey, sha1Bytes(concatBytes(iKey, utf8(msg)))));
}

function toBase64(bytes) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i], b1 = bytes[i + 1], b2 = bytes[i + 2];
    out += chars[b0 >> 2];
    out += chars[((b0 & 3) << 4) | (b1 === undefined ? 0 : b1 >> 4)];
    out += b1 === undefined ? '=' : chars[((b1 & 15) << 2) | (b2 === undefined ? 0 : b2 >> 6)];
    out += b2 === undefined ? '=' : chars[b2 & 63];
  }
  return out;
}

/* ================= 阿里云 RPC 签名与请求 ================= */

// RFC3986 percent-encode (兼容阿里云签名规范)
function pct(str) {
  return encodeURIComponent(String(str))
    .replace(/\+/g, '%20').replace(/\*/g, '%2A').replace(/%7E/g, '~');
}

// RPC 签名: 参数按 key 排序拼接, StringToSign = METHOD&%2F&<encoded-query>, HMAC-SHA1(sk+'&')
function popRpcSign(params, method, sk) {
  const canon = Object.keys(params).sort()
    .map(k => pct(k) + '=' + pct(params[k])).join('&');
  const stringToSign = method + '&%2F&' + pct(canon);
  return toBase64(hmacSha1(sk + '&', stringToSign));
}

function utcTimestamp() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function nonce() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// 统一 RPC 请求: 组装公共参数 + 业务参数, 签名后 POST
function aliyunRequest(domain, version, action, bizParams, ak, sk, region) {
  const params = Object.assign({
    AccessKeyId: ak,
    Action: action,
    Format: 'JSON',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: nonce(),
    SignatureVersion: '1.0',
    Timestamp: utcTimestamp(),
    Version: version,
  }, bizParams || {});
  if (region) params.RegionId = region;
  params.Signature = popRpcSign(params, 'POST', sk);

  const body = Object.keys(params)
    .map(k => pct(k) + '=' + pct(params[k])).join('&');

  return new Promise((resolve, reject) => {
    $httpClient.post({
      url: 'https://' + domain + '/',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body,
    }, (error, response, data) => {
      if (error) return reject(new Error('网络请求失败: ' + JSON.stringify(error)));
      let json;
      try { json = JSON.parse(data || '{}'); } catch (_) { return reject(new Error('响应解析失败')); }
      // 阿里云错误响应含 Code / Message 字段
      if (json.Code) return reject(new Error(json.Code + ': ' + (json.Message || '')));
      resolve(json);
    });
  });
}

/* ================= 业务 API 封装 ================= */

// CDT 互联网流量(字节求和), 与 Python 参考脚本口径一致
async function getCdtTrafficBytes(ak, sk) {
  const resp = await aliyunRequest(CDT_DOMAIN, CDT_VERSION, 'ListCdtInternetTraffic', {}, ak, sk, null);
  const details = resp.TrafficDetails || [];
  return details.reduce((a, d) => a + (d.Traffic || 0), 0);
}

// ECS 实例信息: 状态 / 公网 IP
async function getEcsInstance(ak, sk, region, instanceId) {
  const resp = await aliyunRequest('ecs.' + region + '.aliyuncs.com', ECS_VERSION,
    'DescribeInstances',
    { InstanceIds: JSON.stringify([instanceId]) },
    ak, sk, region);
  const list = (resp.Instances && resp.Instances.Instance) || [];
  if (!list.length) throw new Error('未找到实例 ' + instanceId);
  const inst = list[0];
  // 公网 IP 取值优先级: 固定公网 IP(PublicIpAddress) > 绑定的弹性公网 IP(EipAddress) > VPC 辅助公网 IP
  const fixedIp = (inst.PublicIpAddress && inst.PublicIpAddress.IpAddress) || [];
  const eip = (inst.EipAddress && inst.EipAddress.IpAddress) || '';
  return {
    status: inst.Status || '未知',
    name: inst.InstanceName || instanceId,
    ip: (fixedIp[0] || eip || '').trim(),
  };
}

// 启停实例(带状态检查, 幂等)
async function setEcsPower(ak, sk, region, instanceId, wantRunning) {
  const inst = await getEcsInstance(ak, sk, region, instanceId);
  if (wantRunning && inst.status === 'Running') return 'already-running';
  if (!wantRunning && inst.status === 'Stopped') return 'already-stopped';

  const action = wantRunning ? 'StartInstances' : 'StopInstances';
  const biz = { InstanceIds: JSON.stringify([instanceId]) };
  if (!wantRunning) biz.ForceStop = 'False';
  await aliyunRequest('ecs.' + region + '.aliyuncs.com', ECS_VERSION, action, biz, ak, sk, region);
  return wantRunning ? 'started' : 'stopped';
}

/* ================= 通用工具 ================= */

function getArgs() {
  const raw = typeof $argument === 'string' ? $argument : '';
  const out = {};
  raw.split('&').forEach(pair => {
    if (!pair) return;
    const i = pair.indexOf('=');
    if (i < 0) return (out[pair] = '');
    out[decodeURIComponent(pair.slice(0, i))] = decodeURIComponent(pair.slice(i + 1));
  });
  return out;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return 'N/A';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return v.toFixed(v >= 100 ? 0 : 2) + ' ' + units[i];
}

function normalizeIconColor(raw, fallback) {
  const s = String(raw || '').trim();
  return /^[0-9a-fA-F]{6}$/.test(s) ? '#' + s : fallback;
}

// IP 显示模式: full 完整 / mask 后两段打码 / hide 隐藏
function normalizeIpMode(raw) {
  const s = String(raw || 'mask').trim().toLowerCase();
  return ['full', 'mask', 'hide'].includes(s) ? s : 'mask';
}

function maskIp(ip) {
  const parts = String(ip).split('.');
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.*.*` : ip;
}

// 地区组合: 国家 + 省州 + 城市, 去重去空
function composeRegion(country, regionName, city) {
  const parts = [];
  if (country) parts.push(country);
  if (regionName && regionName !== country && !parts.includes(regionName)) parts.push(regionName);
  if (city && !parts.includes(city)) parts.push(city);
  return parts.join(' ') || null;
}

// IP 反查中文地区: 主 ip-api.com(中文), 备 ipwho.is(https), 结果缓存 24h
async function getGeo(ip) {
  const key = GEO_CACHE_PREFIX + ip;
  try {
    const cached = JSON.parse($persistentStore.read(key) || 'null');
    if (cached && Date.now() - cached.ts < GEO_CACHE_TTL) return cached.region;
  } catch (_) {}

  let region = null;
  try {
    const res = await httpGet(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?lang=zh-CN&fields=status,country,regionName,city,query`,
      { Accept: 'application/json' }
    );
    if (res.status === 200) {
      const geo = JSON.parse(res.body);
      if (geo && geo.status === 'success') region = composeRegion(geo.country, geo.regionName, geo.city);
    }
  } catch (_) {}

  if (!region) {
    try {
      const res = await httpGet(`https://ipwho.is/${encodeURIComponent(ip)}`, { Accept: 'application/json' });
      if (res.status === 200) {
        const geo = JSON.parse(res.body);
        if (geo && geo.success) region = composeRegion(geo.country, geo.region, geo.city);
      }
    } catch (_) {}
  }

  try { $persistentStore.write(JSON.stringify({ region, ts: Date.now() }), key); } catch (_) {}
  return region;
}

function httpGet(url, headers) {
  return new Promise((resolve, reject) => {
    $httpClient.get({ url, headers, timeout: 10000 }, (error, response, data) => {
      if (error) reject(new Error(error));
      else resolve({ status: response.status, body: data });
    });
  });
}

function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ================= 面板渲染 ================= */

function renderPanel(inst, trafficGb, quotaGb, threshold, autoAction, control, ipMode, geo) {
  const pct = quotaGb ? (trafficGb / quotaGb * 100).toFixed(2) + '%' : 'N/A';
  const quotaText = quotaGb ? formatBytes(quotaGb * BYTES_PER_GB) : '未知';
  const over = trafficGb >= threshold;
  const ipText = inst.ip && ipMode !== 'hide' ? 'IP: ' + (ipMode === 'mask' ? maskIp(inst.ip) : inst.ip) : null;

  let controlText = null;
  if (autoAction) {
    const map = { 'started': '已达阈值, 已停止实例', 'stopped': '已达阈值, 已停止实例', 'already-stopped': '已达阈值, 实例已停止', 'already-running': '未达阈值, 实例运行中' };
    controlText = '自动控制: ' + (over ? (map[control] || '已执行停止') : '未达阈值, 实例运行中');
  } else {
    controlText = '自动控制: 关闭 (' + (over ? '已达阈值' : '未达阈值') + ')';
  }

  return [
    '实例: ' + inst.name,
    ipText,
    geo ? '地区: ' + geo : null,
    '已用: ' + formatBytes(trafficGb * BYTES_PER_GB) + ' / ' + quotaText + ' (' + pct + ')',
    '状态: ' + inst.status,
    '阈值: ' + threshold + ' GB',
    controlText,
  ].filter(Boolean).join('\n');
}

/* ================= 主流程 ================= */

async function main() {
  const args = getArgs();
  const mode = args.mode || 'panel';
  const ak = args.ak || '';
  const sk = args.sk || '';
  const region = (args.region || 'cn-hongkong').trim();
  const instanceId = (args['instance-id'] || '').trim();
  const quotaGb = parseFloat(args.quota || '0') || 0;
  const threshold = parseFloat(args.threshold || '180') || 180;
  const autoAction = String(args['auto-action'] || 'false').toLowerCase() === 'true';
  const ipMode = normalizeIpMode(args['ip-mode']);
  const icon = args.icon || DEFAULT_ICON;
  const iconColor = normalizeIconColor(args['icon-color'], DEFAULT_ICON_COLOR);

  try {
    if (!ak || !sk) throw new Error('未配置 AccessKey, 请填写模块参数 access-key-id / secret-access-key');
    if (!instanceId) throw new Error('未配置实例 ID, 请填写模块参数 instance-id');

    // 1. 查询 CDT 互联网流量
    const trafficBytes = await getCdtTrafficBytes(ak, sk);
    const trafficGb = trafficBytes / BYTES_PER_GB;
    const over = trafficGb >= threshold;

    // 2. 阈值自动启停(幂等): <阈值确保运行, ≥阈值确保停止
    let control = null;
    if (autoAction) {
      control = await setEcsPower(ak, sk, region, instanceId, !over);
    }

    // 3. 实例信息
    const inst = await getEcsInstance(ak, sk, region, instanceId);

    // 4. 面板模式: 并发反查 IP 中文地区(缓存 24h), 失败不阻塞
    let geo = null;
    if (mode === 'panel' && inst.ip && ipMode !== 'hide') {
      try { geo = await getGeo(inst.ip); } catch (_) { geo = null; }
    }

    const text = renderPanel(inst, trafficGb, quotaGb, threshold, autoAction, control, ipMode, geo);

    if (mode === 'daily') {
      if (String(args['daily-notify'] || 'true').toLowerCase() === 'false') return $done();
      const key = NOTIFY_DAILY_KEY_PREFIX + todayKey();
      if ($persistentStore.read(key)) return $done(); // 今天已推送过
      const ts = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      $notification.post(
        '阿里云 ECS 流量日报',
        '已用 ' + formatBytes(trafficGb * BYTES_PER_GB) + ' · 实例' + (over ? '已达阈值' : '未达阈值'),
        text + '\n\n' + ts,
        { url: 'https://ecs.console.aliyun.com/' }
      );
      $persistentStore.write('1', key);
      return $done();
    }

    // 不返回 style 字段(对齐 PeekaboPanel), 外观完全由 icon/icon-color 控制,
    // 避免非法 style 值导致图标回退为内置叹号
    $done({
      title: PANEL_TITLE,
      content: text,
      icon,
      'icon-color': iconColor,
    });
  } catch (err) {
    const msg = '❌ ' + String((err && err.message) || err);
    if (mode === 'daily') {
      $notification.post('阿里云 ECS 流量日报', '查询异常', String(err.message || err));
      return $done();
    }
    // 错误态与 PeekaboPanel 一致: 统一 ⚠️ 图标 + 红色
    $done({ title: PANEL_TITLE, content: msg, icon: ERROR_ICON, 'icon-color': ERROR_COLOR });
  }
}

/* ================= 环境入口 ================= */

if (typeof $httpClient !== 'undefined' || typeof $task !== 'undefined') {
  main();
} else if (typeof module !== 'undefined') {
  module.exports = { sha1Bytes, hmacSha1, popRpcSign, toBase64, pct, formatBytes };
}

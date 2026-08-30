/**
 * AWS Lightsail Traffic Panel for Surge
 *
 * 纯脚本实现: 在 JS 内完成 SigV4 签名, 直接调用 Lightsail JSON API,
 * 无需任何服务端中转。支持面板渲染与每日流量推送。
 *
 * 统计口径与 AWS 控制台一致:
 *   - 统计窗口: 当月 1 日 00:00 UTC 至今 (Lightsail 配额按自然月 UTC 重置)
 *   - 指标: NetworkIn / NetworkOut (逐日 Sum 累加)
 *   - 计费流量: max(入站, 出站), Lightsail 双向取大者计费
 *   - 配额: GetBundles 的 transferPerMonthInGb (缓存 24h), 可用 quota 参数覆盖
 *
 * 模块参数 (argument):
 *   ak / sk      IAM AccessKeyId / SecretAccessKey
 *   region       区域, 逗号分隔可填多个, 默认 ap-northeast-1
 *   threshold    告警阈值 (%), 默认 90, 超过后面板标红
 *   icon         面板图标名, 默认 cloud
 *   icon-color   图标颜色, 6位HEX(不含#), 默认 FF9900
 *   mode         panel=面板 / daily=每日通知
 *
 * 面板显示风格对齐 PeekaboPanel: 逐行「字段: 值」, 字节数自适应单位,
 * 错误态统一使用 ⚠️ 图标 + 红色
 */

const SERVICE = 'lightsail';
const TARGET_PREFIX = 'Lightsail_20161128.';
const BYTES_PER_GB = 1024 ** 3;
const CACHE_KEY = 'lightsail_bundle_map_v1';
const CACHE_TTL = 24 * 3600 * 1000;

/* ================= SHA-256 / HMAC (纯 JS, 无外部依赖) ================= */

const SHA_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const rotr = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;

function sha256bytes(input) {
  const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const l = input.length;
  const padded = new Uint8Array((((l + 9) >> 6) + 1) << 6);
  padded.set(input);
  padded[l] = 0x80;
  const bitLen = l * 8;
  padded[padded.length - 8] = Math.floor(bitLen / 0x100000000) & 0xff;
  padded[padded.length - 4] = (bitLen >>> 24) & 0xff;
  padded[padded.length - 3] = (bitLen >>> 16) & 0xff;
  padded[padded.length - 2] = (bitLen >>> 8) & 0xff;
  padded[padded.length - 1] = bitLen & 0xff;

  const dv = new DataView(padded.buffer);
  const w = new Uint32Array(64);

  for (let off = 0; off < padded.length; off += 64) {
    for (let t = 0; t < 16; t++) w[t] = dv.getUint32(off + t * 4);
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
      const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + SHA_K[t] + w[t]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    const round = [a, b, c, d, e, f, g, h];
    for (let i = 0; i < 8; i++) H[i] = (H[i] + round[i]) >>> 0;
  }

  const out = new Uint8Array(32);
  const odv = new DataView(out.buffer);
  H.forEach((v, i) => odv.setUint32(i * 4, v));
  return out;
}

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

function toHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function sha256Hex(input) {
  return toHex(sha256bytes(utf8(input)));
}

function hmacSha256(key, msg) {
  let k = utf8(key);
  if (k.length > 64) k = sha256bytes(k);
  const block = new Uint8Array(64);
  block.set(k);
  const iKey = new Uint8Array(64), oKey = new Uint8Array(64);
  for (let i = 0; i < 64; i++) { iKey[i] = block[i] ^ 0x36; oKey[i] = block[i] ^ 0x5c; }
  return sha256bytes(concatBytes(oKey, sha256bytes(concatBytes(iKey, utf8(msg)))));
}

/* ================= SigV4 签名 ================= */

function amzDateNow() {
  // YYYYMMDDTHHMMSSZ
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
}

function monthStartIso() {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1)).toISOString();
}

function buildAuthHeader(method, host, target, body, region, ak, sk, amzDate) {
  const dateStamp = amzDate.slice(0, 8);
  const canonicalHeaders =
    'content-type:application/x-amz-json-1.1\n' +
    'host:' + host + '\n' +
    'x-amz-date:' + amzDate + '\n' +
    'x-amz-target:' + target + '\n';
  const signedHeaders = 'content-type;host;x-amz-date;x-amz-target';
  // SigV4 规范: method \n canonicalURI \n canonicalQueryString \n canonicalHeaders \n ...
  // query string 为空时必须保留一个空行
  const canonicalRequest = [
    method, '/', '', canonicalHeaders, signedHeaders,
    sha256Hex(utf8(body)),
  ].join('\n');
  const scope = dateStamp + '/' + region + '/' + SERVICE + '/aws4_request';
  const stringToSign = [
    'AWS4-HMAC-SHA256', amzDate, scope,
    sha256Hex(utf8(canonicalRequest)),
  ].join('\n');

  const kSigning = hmacSha256(
    hmacSha256(hmacSha256(hmacSha256(utf8('AWS4' + sk), dateStamp), region), SERVICE),
    'aws4_request',
  );
  const signature = toHex(hmacSha256(kSigning, stringToSign));
  return 'AWS4-HMAC-SHA256 Credential=' + ak + '/' + scope +
    ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
}

/* ================= Lightsail API ================= */

function httpPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    $httpClient.post({ url, headers, body }, (error, response, data) => {
      if (error) return reject(new Error('网络请求失败: ' + JSON.stringify(error)));
      resolve({ status: response.status, body: data || '' });
    });
  });
}

function lightsail(region, action, params, ak, sk) {
  const host = 'lightsail.' + region + '.amazonaws.com';
  const target = TARGET_PREFIX + action;
  const body = JSON.stringify(params || {});
  const amzDate = amzDateNow();
  return httpPost('https://' + host + '/', {
    'Content-Type': 'application/x-amz-json-1.1',
    'X-Amz-Date': amzDate,
    'X-Amz-Target': target,
    'Authorization': buildAuthHeader('POST', host, target, body, region, ak, sk, amzDate),
  }, body).then(r => {
    if (r.status !== 200) {
      let msg = 'HTTP ' + r.status;
      try {
        const j = JSON.parse(r.body);
        msg = (j.__type || msg) + (j.Message || j.message ? ': ' + (j.Message || j.message) : '');
      } catch (e) { /* 保留原始状态码信息 */ }
      throw new Error(msg);
    }
    return JSON.parse(r.body);
  });
}

/* ================= 业务逻辑 ================= */

const PANEL_TITLE = 'AWS Lightsail';                // 面板标题
const DEFAULT_ICON = 'cloud';                       // 默认面板图标
const DEFAULT_ICON_COLOR = '#FF9900';               // 默认图标颜色
const ERROR_ICON = 'exclamationmark.triangle.fill'; // 错误态图标
const ERROR_COLOR = '#EF4444';                      // 错误态颜色

// 字节数自适应单位, 与 PeekaboPanel 格式一致: 1.23 GB / 128 KB
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

// 图标颜色校验: 6位HEX(不含#), 合法补#, 非法回退默认
function normalizeIconColor(raw, fallback) {
  const s = String(raw || '').trim();
  return /^[0-9a-fA-F]{6}$/.test(s) ? '#' + s : fallback;
}

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

async function getBundleMap(ak, sk, region) {
  const cached = JSON.parse($persistentStore.read(CACHE_KEY) || 'null');
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.map;

  const map = {};
  const resp = await lightsail(region, 'GetBundles', { includeInactive: false }, ak, sk);
  (resp.bundles || []).forEach(b => { map[b.bundleId] = b.transferPerMonthInGb || 0; });
  $persistentStore.write(CACHE_KEY, JSON.stringify({ ts: Date.now(), map }));
  return map;
}

function monthStartEpoch() {
  const n = new Date();
  return Math.floor(new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1)).getTime() / 1000);
}

function getTraffic(ak, sk, region, name) {
  const base = {
    instanceName: name,
    period: 86400,
    startTime: monthStartEpoch(),
    endTime: Math.floor(Date.now() / 1000),
    unit: 'Bytes',
    statistics: ['Sum'],
  };
  const sumMetric = metric =>
    lightsail(region, 'GetInstanceMetricData', Object.assign({}, base, { metricName: metric }), ak, sk)
      .then(r => (r.metricData || []).reduce((a, p) => a + (p.sum || 0), 0));
  return Promise.all([sumMetric('NetworkIn'), sumMetric('NetworkOut')]);
}

async function fetchUsage(args) {
  const ak = args.ak || '';
  const sk = args.sk || '';
  const regions = (args.region || 'ap-northeast-1').split(',').map(s => s.trim()).filter(Boolean);

  if (!ak || !sk) throw new Error('未配置 IAM 凭证, 请填写模块参数 access-key-id / secret-access-key');

  const bundleMap = await getBundleMap(ak, sk, regions[0]);
  const rows = [];

  for (const region of regions) {
    const resp = await lightsail(region, 'GetInstances', {}, ak, sk);
    const instances = resp.instances || [];

    for (const inst of instances) {
      const [inB, outB] = await getTraffic(ak, sk, region, inst.name);
      const billed = Math.max(inB, outB);
      const quotaGb = (inst.networking && inst.networking.monthlyTrafficAllocationInGb)
        || bundleMap[inst.bundleId] || 0;
      const quotaB = quotaGb * BYTES_PER_GB;
      rows.push({
        region,
        name: inst.name,
        inGB: inB / BYTES_PER_GB,
        outGB: outB / BYTES_PER_GB,
        billedGB: billed / BYTES_PER_GB,
        quotaGb,
        pct: quotaB ? (billed / quotaB) * 100 : 0,
        over: !!(quotaB && billed > quotaB),
      });
    }
  }
  return rows;
}

function renderRows(rows, threshold) {
  const byRegion = {};
  rows.forEach(r => { (byRegion[r.region] = byRegion[r.region] || []).push(r); });

  const multiRegion = Object.keys(byRegion).length > 1;
  const lines = [];
  Object.keys(byRegion).sort().forEach(region => {
    if (multiRegion) lines.push('地区: ' + region);
    byRegion[region].forEach(r => {
      lines.push(
        '实例: ' + r.name +
        '\n已用: ' + formatBytes(r.billedGB * BYTES_PER_GB) +
        ' / ' + (r.quotaGb ? formatBytes(r.quotaGb * BYTES_PER_GB) : '未知') +
        ' (' + r.pct.toFixed(2) + '%)' +
        (r.over || r.pct > threshold ? ' ⚠️' : '')
      );
    });
  });
  const overAny = rows.some(r => r.over || r.pct > threshold);
  return { text: lines.join('\n') || '未找到 Lightsail 实例', overAny };
}

async function main() {
  const args = getArgs();
  const mode = args.mode || 'panel';
  const threshold = parseFloat(args.threshold || '90') || 90;
  const icon = args.icon || DEFAULT_ICON;
  const iconColor = normalizeIconColor(args['icon-color'] || args.iconColor, DEFAULT_ICON_COLOR);

  try {
    const rows = await fetchUsage(args);
    const { text, overAny } = renderRows(rows, threshold);

    if (mode === 'daily') {
      if (args.dailyNotify === 'false') return $done();
      const ts = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      $notification.post(
        'AWS Lightsail 流量日报',
        '阈值 ' + threshold + '% · ' + rows.length + ' 个实例',
        text + '\n\n' + ts,
        { url: 'https://lightsail.aws.amazon.com/' },
      );
      return $done();
    }

    // 不返回 style 字段(对齐 PeekaboPanel), 外观完全由 icon/icon-color 控制,
    // 避免非法 style 值导致图标回退为内置叹号; 超阈值在内容行尾以 ⚠️ 提示
    $done({
      title: PANEL_TITLE,
      content: text,
      icon,
      'icon-color': overAny ? '#EF4444' : iconColor,
    });
  } catch (err) {
    const msg = '❌ 获取失败: ' + err.message;
    if (mode === 'daily') {
      $notification.post('AWS Lightsail 流量日报', '查询异常', String(err.message));
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
  // Node 环境 (用于单元测试签名原语)
  module.exports = { sha256Hex, hmacSha256, buildAuthHeader, amzDateNow, monthStartIso, utf8 };
}

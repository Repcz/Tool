/*
  Peekabo 服务器流量信息 (Surge 面板 + 每日定时通知)
  逻辑参考: xream/scripts → surge/modules/sub-store-scripts/sub-info/peekabo.js
  依赖参数(argument): id=<服务器ID>&token=<API Token>&icon=<SF Symbol>&icon-color=<6位HEX>&ip-mode=<full|mask|hide>&daily-notify=<true|false>
  双模式(同一脚本):
    - Panel (type=generic): 面板展示服务器名称/IP/地区/已用/剩余/到期
    - Daily (type=cron):    每日定时推送流量日报; 剩余<=5天时改为到期提醒(均按天去重)
  已用流量按服务器出站流量(tx)统计, 与 Peekabo 计费口径一致
  地区: ip-api.com 反查(中文), 失败回退 ipwho.is, 结果经 $persistentStore 缓存 24h
*/

const ARGS = parseArgs($argument || "");

const API_TOKEN = ARGS.token;
const SERVER_ID = ARGS.id;

const GEO_CACHE_TTL = 24 * 60 * 60; // 24h
const NOTIFY_DAYS = 5; // 剩余天数 <= 5 时发送到期提醒
const PANEL_TITLE = "Peekabo Server"; // 面板标题
const PANEL_ICON = ARGS.icon || "xserve"; // 面板图标(SF Symbol), 模块参数可配置
const ERROR_ICON = "exclamationmark.triangle.fill"; // 错误态图标
// 图标颜色(6位HEX, 不含#), 模块参数可配置
const PANEL_ICON_COLOR = /^[0-9a-fA-F]{6}$/.test(String(ARGS["icon-color"] || "").trim())
  ? `#${String(ARGS["icon-color"]).trim()}`
  : "#3B82F6";
const ERROR_COLOR = "#EF4444"; // 错误态
// IP 显示模式: full 完整 / mask 后两段打码 / hide 隐藏
const ipModeRaw = String(ARGS["ip-mode"] || "mask").toLowerCase();
const IP_MODE = ["full", "mask", "hide"].includes(ipModeRaw) ? ipModeRaw : "mask";
// 每日推送开关(默认开), 模块参数可配置
const DAILY_NOTIFY = String(ARGS["daily-notify"] || "true").toLowerCase() !== "false";
// cron 上下文判定: type=cron 触发时 $cronexp 存在; type=generic 面板触发时不存在
const IS_CRON = typeof $cronexp === "string" && $cronexp.length > 0;

function maskIp(ip) {
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.*.*`;
  return ip;
}

// 安全解码: 值含 % 或无效编码时不抛错, 原样返回
function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch (_) {
    return str;
  }
}

function parseArgs(str) {
  const out = {};
  if (!str) return out;
  for (const pair of str.split("&")) {
    const idx = pair.indexOf("=");
    if (idx < 0) continue;
    const key = safeDecode(pair.slice(0, idx)).trim();
    const value = safeDecode(pair.slice(idx + 1)).trim();
    if (key) out[key] = value;
  }
  return out;
}

function httpGet(url, headers) {
  return new Promise((resolve, reject) => {
    $httpClient.get(
      { url, headers, timeout: 10000 },
      (error, response, data) => {
        if (error) reject(new Error(error));
        else resolve({ status: response.status, body: data });
      }
    );
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "N/A";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 ? 0 : 2)} ${units[i]}`;
}

function formatDate(ts) {
  const d = new Date(ts * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function composeRegion(country, regionName, city) {
  const parts = [];
  if (country) parts.push(country);
  if (regionName && regionName !== country && !parts.includes(regionName)) parts.push(regionName);
  if (city && !parts.includes(city)) parts.push(city);
  return parts.join(" ") || null;
}

async function getGeo(ip) {
  const key = `peekabo_geo_${ip}`;
  try {
    const cached = $persistentStore.read(key);
    if (cached) {
      const obj = JSON.parse(cached);
      if (Date.now() - obj.ts < GEO_CACHE_TTL) return obj.region;
    }
  } catch (_) {}

  let region = null;
  // 主: ip-api.com (中文)
  try {
    const res = await httpGet(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?lang=zh-CN&fields=status,country,regionName,city,query`,
      { Accept: "application/json" }
    );
    if (res.status === 200) {
      const geo = JSON.parse(res.body);
      if (geo && geo.status === "success") {
        region = composeRegion(geo.country, geo.regionName, geo.city);
      }
    }
  } catch (_) {}

  // 备: ipwho.is (https)
  if (!region) {
    try {
      const res = await httpGet(`https://ipwho.is/${encodeURIComponent(ip)}`, {
        Accept: "application/json",
      });
      if (res.status === 200) {
        const geo = JSON.parse(res.body);
        if (geo && geo.success) {
          region = composeRegion(geo.country, geo.region, geo.city);
        }
      }
    } catch (_) {}
  }

  try {
    $persistentStore.write(JSON.stringify({ region, ts: Date.now() }), key);
  } catch (_) {}
  return region;
}

// 剩余天数 <= NOTIFY_DAYS 时发送到期提醒, 按天去重(每天最多一次)
function notifyExpiring(daysLeft, planName, expire) {
  if (daysLeft > NOTIFY_DAYS) return;
  const key = `peekabo_notify_${todayKey()}`;
  try {
    if ($persistentStore.read(key)) return; // 今天已通知过
    $notification.post(
      "Peekabo 流量提醒",
      `${planName} 剩余 ${daysLeft} 天`,
      `到期时间: ${formatDate(expire)}，请及时续费`
    );
    $persistentStore.write("1", key);
  } catch (_) {}
}

// 每日流量日报, 按天去重(每天最多一次)
function notifyDaily(planName, usedText, totalText, percent, daysLeft, expire) {
  const key = `peekabo_daily_${todayKey()}`;
  try {
    if ($persistentStore.read(key)) return; // 今天已推送过
    $notification.post(
      "Peekabo 流量日报",
      `${planName} 已用 ${usedText} / ${totalText} (${percent}%)`,
      `剩余 ${daysLeft} 天，到期: ${formatDate(expire)}`
    );
    $persistentStore.write("1", key);
  } catch (_) {}
}

function finish(title, content, icon, iconColor) {
  $done({ title, content, icon, "icon-color": iconColor });
}

function fail(msg) {
  finish(PANEL_TITLE, `❌ ${msg}`, ERROR_ICON, ERROR_COLOR);
}

(async () => {
  try {
    if (!API_TOKEN || !SERVER_ID) {
      if (IS_CRON) return $done(); // 定时任务静默失败, 不打扰
      return fail("缺少 id / token 参数");
    }

    const res = await httpGet(
      `https://vf-hk.peekabo.io/api/server/${encodeURIComponent(SERVER_ID)}?state=true`,
      { Accept: "application/json", Authorization: `Bearer ${API_TOKEN}` }
    );

    if (res.status !== 200) {
      if (IS_CRON) return $done();
      return fail(`API 请求失败 (HTTP ${res.status})`);
    }

    let json;
    try {
      json = JSON.parse(res.body);
    } catch (_) {
      if (IS_CRON) return $done();
      return fail("API 响应解析失败");
    }

    const data = json.data;
    const traffic = data?.state?.network?.primary?.traffic;
    const limit = String(data?.network?.primary?.limit || "")
      .trim()
      .match(/^(\d+(?:\.\d+)?)\s*GB$/i);
    const used = traffic?.tx; // 出站流量
    const total = limit ? Number(limit[1]) * 1024 ** 3 : NaN;
    const expire = Math.floor(Date.parse(data?.currentMonthlyPeriod?.end) / 1000);
    const planName = String(data?.name || "").trim();
    const ip = data?.network?.primary?.ipv4?.[0]?.address || "";

    if (
      ![used, total, expire].every(Number.isSafeInteger) ||
      used < 0 ||
      total <= 0 ||
      expire <= 0 ||
      !planName
    ) {
      if (IS_CRON) return $done();
      return fail("API 返回的流量信息不完整");
    }

    // 地区反查(带缓存, 失败不阻塞)
    const region = ip ? await getGeo(ip) : null;

    const usedText = formatBytes(used);
    const totalText = formatBytes(total);
    const percent = ((used / total) * 100).toFixed(2);
    const now = Math.floor(Date.now() / 1000);
    const daysLeft = Math.max(0, Math.ceil((expire - now) / 86400));

    // === 每日定时推送模式 ===
    if (IS_CRON) {
      if (DAILY_NOTIFY) {
        // 剩余 <= NOTIFY_DAYS: 优先到期提醒, 避免与日报重复打扰
        if (daysLeft <= NOTIFY_DAYS) {
          notifyExpiring(daysLeft, planName, expire);
        } else {
          notifyDaily(planName, usedText, totalText, percent, daysLeft, expire);
        }
      }
      return $done(); // cron 脚本结果对象被忽略, bare $done() 即可
    }

    // === 面板模式 ===
    // 剩余 <= NOTIFY_DAYS 天时发送到期通知(按天去重)
    notifyExpiring(daysLeft, planName, expire);

    const ipText = IP_MODE === "hide" ? null : `IP: ${IP_MODE === "mask" ? maskIp(ip) : ip}`;
    const content = [
      `服务器: ${planName}`,
      ip ? ipText : null,
      `地区: ${region || "未知"}`,
      `已用: ${usedText} / ${totalText} (${percent}%)`,
      `剩余: ${daysLeft} 天`,
      `到期: ${formatDate(expire)}`,
    ]
      .filter(Boolean)
      .join("\n");

    finish(PANEL_TITLE, content, PANEL_ICON, PANEL_ICON_COLOR);
  } catch (e) {
    if (IS_CRON) return $done(); // 定时任务静默失败
    fail(String((e && e.message) || e));
  }
})();

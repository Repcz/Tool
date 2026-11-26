// mihomo ≥ v1.19.31
//
// 最后更新时间: 2026-9-17 11:30

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://1.1.1.1/generate_204"
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = 7893;
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = true;

  // 覆盖 profile 配置
  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": false
  };

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": ":1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ['+.lan', '*', '+.local', '+.cmpassport.com', 'id6.me', 'open.e.189.cn', 'mdn.open.wo.cn', 'opencloud.wostore.cn', 'auth.wosms.cn', '+.10099.com.cn', '+.msftconnecttest.com', '+.msftncsi.com', 'lancache.steamcontent.com'],
    "cache-algorithm": "arc",
    "default-nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"],
    "proxy-server-nameserver": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"]
  };

  // 覆盖 hosts 配置, 固定 DoH 服务器域名解析, 避免回环
  config["hosts"] = {
    "dns.alidns.com": ["223.5.5.5", "223.6.6.6"],
    "doh.pub": ["1.12.12.21", "120.53.53.53"]
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = false;
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;
  config["geox-url"] = {
    "mmdb": "https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country-without-asn.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "force-dns-mapping": true, // 对 redir-host/TUN 流量强制嗅探
    "parse-pure-ip": true, // 对无域名流量的纯 IP 连接强制嗅探
    "sniff": {
      "HTTP": {
        "ports": [80],
        "override-destination": true
      },
      "TLS": {
        "ports": [443, 8443]
      },
      "QUIC": {
        "ports": [443, 8443]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mips",
    "dns-hijack": ["any:53"],
    "auto-route": true, // 配置路由表
    "auto-detect-interface": true, // 自动识别出口网卡
    "strict-route": false
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "Manual",
      "type": "select",
      "proxies": ["HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "include-all": true,
      "icon": "https://github.com/shindgewongxj/WHATSINStash/raw/main/icon/applesafari.png"
    },
    {
      ...groupBaseOption,
      "name": "Global",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png"
    },
    {
      ...groupBaseOption,
      "name": "Streaming",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "Microsoft",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },
    {
      ...groupBaseOption,
      "name": "Social",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "Game",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "include-all": true,
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "include-all": true,
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png"
    },
    {
      ...groupBaseOption,
      "name": "Final",
      "type": "select",
      "proxies": ["Manual", "HongKong", "United States", "Singapore", "Japan", "Taiwan", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    },
    // 地区分组（filter 使用单引号语义，JS 中 "\\b" 传输字面量 \b 给 mihomo 正则）
    {
      ...groupBaseOption,
      "name": "HongKong",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\\b(HK|Hong)\\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "United States",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\\b(US|United States)\\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "Singapore",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\\b(SG|Singapore)\\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "Japan",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\\b(JP|Japan)\\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "Taiwan",
      "type": "url-test",
      "tolerance": 0,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\\b(TW|Tai|Taiwan)\\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Direct": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Direct.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Lan.list"
    },
    "Reject": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Reject.list"
    },
    "AppleProxy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/AppleServers.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Microsoft.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Github.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Google.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Twitter.list"
    },
    "Facebook": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Facebook.list"
    },
    "Steam": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Steam.list"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Epic.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/AI.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Emby.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Spotify.list"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Bahamut.list"
    },
    "Netflix": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Netflix.list"
    },
    "Disney": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Disney.list"
    },
    "PrimeVideo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/PrimeVideo.list"
    },
    "HBO": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/HBO.list"
    },
    "TikTok": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/TikTok.list"
    },
    "Proxy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Proxy.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,Lan,DIRECT",
    "RULE-SET,Direct,DIRECT",
    "RULE-SET,Reject,REJECT",
    "RULE-SET,AI,AI",
    "RULE-SET,Telegram,Telegram",
    "RULE-SET,Twitter,Social",
    "RULE-SET,Facebook,Social",
    "RULE-SET,TikTok,Social",
    "RULE-SET,Steam,Game",
    "RULE-SET,Epic,Game",
    "RULE-SET,Google,Google",
    "RULE-SET,Github,Microsoft",
    "RULE-SET,Microsoft,Microsoft",
    "RULE-SET,Emby,Emby",
    "RULE-SET,Spotify,Spotify",
    "RULE-SET,Bahamut,Streaming",
    "RULE-SET,Netflix,Streaming",
    "RULE-SET,Disney,Streaming",
    "RULE-SET,PrimeVideo,Streaming",
    "RULE-SET,HBO,Streaming",
    "RULE-SET,Proxy,Global",
    "RULE-SET,AppleProxy,HongKong",
    "GEOIP,CN,DIRECT",
    "MATCH,Final"
  ];

  // 返回修改后的配置
  return config;
}

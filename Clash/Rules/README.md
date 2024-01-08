说明
---

### 本转换项目代码均由ChatGPT撰写，如有遗漏或错误请自行修改

### 规则数据来源：

- [@ACL4SSR](https://github.com/ACL4SSR/ACL4SSR/tree/master)
- [@Anti-ad](https://github.com/privacy-protection-tools/anti-AD)
- [@blackmatrix7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule)
- [@ConnersHua](https://github.com/ConnersHua/RuleGo/tree/master)
- [@dler-io](https://github.com/dler-io/Rules)
- [@fmz200](https://github.com/fmz200)
- [@iKeLee](https://gitlab.com/lodepuly/vpn_tool)
- [@Loyalsoldier](https://github.com/Loyalsoldier/geoip)
- [@limbopro](https://github.com/limbopro/Adblock4limbo)
- [@Masaiki](https://github.com/Masaiki/GeoIP2-CN)
- [@MisakaFxxk](https://github.com/MisakaFxxk/MisakaF_Subconverter)
- [@missuo](https://github.com/missuo/ASN-China)
- [@NobyDa](https://github.com/NobyDa)
- [@RuCu6](https://github.com/RuCu6/QuanX)
- [@VirgilClyne](https://github.com/VirgilClyne)
- [@soffchen](https://github.com/soffchen/GeoIP2-CN)


规则目录
---

> 如无特殊说明，均使用`behavior: classical`,  `format: text`。

eg:
* Bilibili.list
```
BiliBili: {type: http, behavior: classical,  format: text, interval: 86400 path: ./ruleset/BiliBili.list,  url: https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Rules/Bilibli.list}
```



| 苹果  |  |
| :---- | ---- |
| [Apple](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list) | 苹果规则合集 | 

| OpenAI  |  |
| :---- | ---- |
| [OpenAI](https://github.com/Repcz/Tool/raw/X/Clash/Rules/OpenAI.list) | OpenAI | 
| [ChatGPT_Voice](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChatGPT_Voice.list) | ChatGPT语音规则 | 

| 国外社交媒体  |  |
| :---- | ---- |
| [Twitter](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Twitter.list) | |
| [Instagram](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Instagram.list) | |
| [Facebook](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Facebook.list) | |
| [Telegram](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list) | |

| 谷歌  |  |
| :---- | ---- |
| [YouTube](https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list) |建议和Google一同使用并使用同一策略 |
| [Google](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list) |建议和YouTube一同使用并使用同一策略 |

| 微软  |  |
| :---- | ---- |
| [Copilot](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Copilot.list) | |
| [Github](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list) | |
| [OneDrive](https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list) |建议和Microsoft使用同一策略 |
| [Microsoft](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list) |包含Bing&Copilot规则 |

| 国外流媒体  |  |
| :---- | ---- |
| [TikTok](https://github.com/Repcz/Tool/raw/X/Clash/Rules/TikTok.list) | |
| [Netflix](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Netflix.list) | |
| [HBO](https://github.com/Repcz/Tool/raw/X/Clash/Rules/HBO.list) | |
| [Disney](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Disney.list) | |
| [Spotify](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list) | |
| [PrimeVideo](https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list) | |
| [FitnessPlus](https://github.com/Repcz/Tool/raw/X/Clash/Rules/FitnessPlus.list) | |
| [AppleMedia](https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list) | |
| [Bahamut](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bahamut.list) | |
| [ProxyMedia](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyMedia.list) |流媒体合集，不建议使用 |

| Emby  |  |
| :---- | ---- |
| [Emby](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Emby.list) |规则缺失或错误，请使用[@Lucy_PM_bot](https://t.me/Lucy_PM_bot)提交反馈 |

| PayPal  |  |
| :---- | ---- |
| [PayPal](https://github.com/Repcz/Tool/raw/X/Clash/Rules/PayPal.list) | |

| GFW  |  |
| :---- | ---- |
| [ProxyGFW](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list) | |

| 游戏平台规则  |  |
| :---- | ---- |
| [Steam](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Steam.list) | |
| [Epic](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Epic.list) | |
| [Game](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Game.list) |游戏平台规则合集 |

| 下载CDN规则  | 涉及Steam、EPIC、GOG、育碧、艺电、战网、拳头、贝塞斯达、FiveM、Hikari Field、Dlsite、万代南梦宫、微软商店、微软全家桶软件等多个平台在国内和国外的上传、下载、同步、更新及在线安装。 |
| :---- | ---- |
| [DownloadCDN_CN](https://github.com/Repcz/Tool/raw/X/Clash/Rules/DownloadCDN_CN.list) |国内CDN |
| [DownloadCDN_Global](https://github.com/Repcz/Tool/raw/X/Clash/Rules/DownloadCDN_Global.list) |国际CDN |

| 国内规则  |  |
| :---- | ---- |
| [WeChat](https://github.com/Repcz/Tool/raw/X/Clash/Rules/WeChat.list) |包含微信和WeChat |
| [Bilibili](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bilibili.list) | |
| [ChinaIPv4](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaIPv4.list) |国内IPv4合集,请使用`behavior: ipcidr`,` format: text` |
| [ChinaIPv6](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaIPv6.list) |国内IPv6合集,请使用`behavior: ipcidr`,` format: text` |
| [ChinaDomain](https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list) |国内域名合集 |

eg：
* ChinaIPv6.list
```
ChinaIPv6: {type: http, behavior: ipcidr, format: text, interval: 86400 path: ./ruleset/ChinaIPv6.list,  url: https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Rules/ChinaIPv6.list}
```

| 局域网规则  |  |
| :---- | ---- |
| [Lan](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list) | |

| 下载器规则  |  |
| :---- | ---- |
| [Download](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Download.list) | |

| 广告规则  |  |
| :---- | ---- |
| [Ads_Dlerio](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Ads_Dlerio.list) |作者[@dler-io](https://github.com/dler-io/Rules)  |
| [Ads_EasyListChina](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Ads_EasyListChina.list) |EasyListChina |
| [Ads_EasyListPrivacy](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Ads_EasyListPrivacy.list) |EasyListPrivacy |
| [AdGuardChinese](https://github.com/Repcz/Tool/raw/X/Clash/Rules/AdGuardChinese.list) |AdGuardChinese |
| [Anti-ad](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Anti-ad.list) |请使用`behavior: domain`,` format: text` |
| [Ads_QQMusic](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Ads_QQMusic.list) |QQ音乐去广告(移动端有效) 作者[@iKeLee](https://gitlab.com/lodepuly/vpn_tool) |

eg：
* Anti-ad.list
```
Anti-ad: {type: http, behavior: domain,  format: text, interval: 86400 path: ./ruleset/Anti-ad.list,  url: https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Rules/Anti-ad.list}
```


| 作者[@ConnersHua](https://github.com/ConnersHua)   |  |
| :---- | ---- |
| [Ads_ConnersHua](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Ads_ConnersHua.list) |Policy选择REJECT |
| [Hijacking_ConnersHua](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Hijacking_ConnersHua.list) |Policy选择REJECT |
| [Tracking_ConnersHua](https://github.com/Repcz/Tool/raw/X/Clash/Rules/Tracking_ConnersHua.list) | Policy选择REJECT|

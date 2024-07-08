# 2024-07-08 21:52

#!/bin/bash

# 创建规则目录
mkdir -p Tool/{Clash,Egern,Loon,QuantumultX,Shadowrocket,Stash,Surge}/Rules

#--- Surge ---#

# 苹果
curl -L -o Tool-repo/Surge/Rules/APNs.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Surge/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Surge/Rules/AppStore.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Surge/Rules/AppleID.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Surge/Rules/AppleMusic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Surge/Rules/iCloud.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Surge/Rules/TestFlight.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Surge/Rules/AppleProxy.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Surge/Rules/OpenAI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Surge/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Surge/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Surge/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Surge/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Surge/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Surge/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Surge/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Surge/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Surge/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Surge/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 甲骨文
curl -L -o Tool-repo/Surge/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# 流媒体
curl -L -o Tool-repo/Surge/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Surge/Rules/Netflix.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list"
curl -L -o Tool-repo/Surge/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Surge/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Surge/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Surge/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Surge/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Surge/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Surge/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Surge/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
# PayPal
curl -L -o Tool-repo/Surge/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# Cloudflare
curl -L -o Tool-repo/Surge/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Surge/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# 游戏规则 
curl -L -o Tool-repo/Surge/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Surge/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
curl -L -o Tool-repo/Surge/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Game/Game.list"
# 下载CDN
curl -L -o Tool-repo/Surge/Rules/DownloadCDN_Global.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/InternationalDownloadCDN.list"
curl -L -o Tool-repo/Surge/Rules/DownloadCDN_CN.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ChinaDownloadCDN.list"
# 国内规则 
curl -L -o Tool-repo/Surge/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Surge/Rules/WeChat.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/WeChat.list"
curl -L -o Tool-repo/Surge/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
curl -L -o Tool-repo/Surge/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
# 广告规则 
curl -L -o Tool-repo/Surge/Rules/Ads_RuCu6.list "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
curl -L -o Tool-repo/Surge/Rules/Ads_limbopro.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Surge/rule/Adblock4limbo_surge.list"
curl -L -o Tool-repo/Surge/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Surge/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Surge/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Surge/Rules/Ads_AWAvenue.list "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge.list"
curl -L -o Tool-repo/Surge/Rules/AdGuardChinese.list "https://raw.githubusercontent.com/geekdada/surge-list/master/domain-set/chinese-filter.txt"
# 自定义广告规则
cp -r Tool-repo/Surge/Rules/Customrules/Empty.list Tool-repo/Surge/Rules/Reject.list
# fmz200
curl -L -o Tool-repo/Surge/Rules/Direct_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Surge/Rules/Ads_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# SukkaW
curl -L -o Tool-repo/Surge/Rules/Ads_SukkaW.list "https://ruleset.skk.moe/List/domainset/reject.conf"
curl -L -o Tool-repo/Surge/Rules/Ads_SukkaW_NoIP.list "https://ruleset.skk.moe/List/non_ip/reject.conf"
# ConnersHua
curl -L -o Tool-repo/Surge/Rules/Ads_ConnersHua.list "https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Advertising.list"
curl -L -o Tool-repo/Surge/Rules/Hijacking_ConnersHua.list "https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Hijacking.list"
curl -L -o Tool-repo/Surge/Rules/Tracking_ConnersHua.list "https://raw.githubusercontent.com/ConnersHua/RuleGo/master/Surge/Ruleset/Extra/Reject/Tracking.list"



#--- Clash ---#

# 流媒体
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Clash/Rules/Emby.list
curl -L -o Tool-repo/Clash/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Clash/Rules/Netflix.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Clash/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Clash/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Clash/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Clash/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Clash/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Clash/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Clash/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Clash/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
# 下载规则
curl -L -o Tool-repo/Clash/Rules/Download.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Download/Download.list"
# 苹果
curl -L -o Tool-repo/Clash/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
# OpenAI
curl -L -o Tool-repo/Clash/Rules/OpenAI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Clash/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Clash/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Clash/Rules/Telegram.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Clash/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Clash/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Clash/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Clash/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Clash/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Clash/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Clash/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Clash/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 甲骨文
curl -L -o Tool-repo/Clash/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# Cloudflare
curl -L -o Tool-repo/Clash/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Clash/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
curl -L -o Tool-repo/Clash/Rules/Trust.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Trust.list"
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Clash/Rules/Trust.list
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Clash/Rules/Talkatone.list
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Clash/Rules/Talkatone.list
# PayPal
curl -L -o Tool-repo/Clash/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# 国内规则 
curl -L -o Tool-repo/Clash/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Clash/Rules/WeChat.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Clash/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Surge/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# 游戏规则 
curl -L -o Tool-repo/Clash/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Clash/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Clash/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 下载CDN
curl -L -o Tool-repo/Clash/Rules/DownloadCDN_Global.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/InternationalDownloadCDN.list"
curl -L -o Tool-repo/Clash/Rules/DownloadCDN_CN.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ChinaDownloadCDN.list"
# 广告规则 
curl -L -o Tool-repo/Clash/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Clash/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Clash/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Clash/Rules/Anti-ad.list "https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Clash/Rules/AdGuardChinese.list
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Clash/Rules/Lan.list



#--- Quantumult X ---#

curl -L -o Tool-repo/QuantumultX/Rules/APNs.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/QuantumultX/Rules/Lan.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list"
curl -L -o Tool-repo/QuantumultX/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/QuantumultX/Rules/AppStore.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/QuantumultX/Rules/AppleID.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/QuantumultX/Rules/AppleMusic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/QuantumultX/Rules/TestFlight.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/QuantumultX/Rules/iCloud.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/QuantumultX/Rules/AppleProxy.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
cp -r Tool-repo/Surge/Rules/OpenAI.list Tool-repo/QuantumultX/Rules/OpenAI.list
# Claude AI
curl -L -o Tool-repo/QuantumultX/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/QuantumultX/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/QuantumultX/Rules/Telegram.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/QuantumultX/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/QuantumultX/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/QuantumultX/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/QuantumultX/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/QuantumultX/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
curl -L -o Tool-repo/QuantumultX/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
# 微软
curl -L -o Tool-repo/QuantumultX/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/QuantumultX/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 流媒体
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/QuantumultX/Rules/Emby.list
curl -L -o Tool-repo/QuantumultX/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/QuantumultX/Rules/Netflix.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/QuantumultX/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/QuantumultX/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/QuantumultX/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/QuantumultX/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/QuantumultX/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/QuantumultX/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/QuantumultX/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/QuantumultX/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
# PayPal
curl -L -o Tool-repo/QuantumultX/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# 甲骨文
curl -L -o Tool-repo/QuantumultX/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# Cloudflare
curl -L -o Tool-repo/QuantumultX/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/QuantumultX/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/QuantumultX/Rules/Trust.list
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/QuantumultX/Rules/TronLink.list
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/QuantumultX/Rules/Talkatone.list
# 国内规则
curl -L -o Tool-repo/QuantumultX/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/QuantumultX/Rules/WeChat.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/QuantumultX/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/QuantumultX/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# 游戏规则
curl -L -o Tool-repo/QuantumultX/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/QuantumultX/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
curl -L -o Tool-repo/QuantumultX/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
# 防DNS泄漏
cp -r Tool-repo/Surge/Rules/Prevent_DNS_Leaks.list Tool-repo/QuantumultX/Rules/Prevent_DNS_Leaks.list
# 广告规则
curl -L -o Tool-repo/QuantumultX/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/QuantumultX/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/QuantumultX/easyprivacy.list"
curl -L -o Tool-repo/QuantumultX/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/QuantumultX/Rules/Ads_limbopro.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Surge/rule/Adblock4limbo_surge.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/QuantumultX/Rules/AdGuardChinese.list
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/QuantumultX/Rules/Ads_SukkaW.list
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/QuantumultX/Rules/Reject.list
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/QuantumultX/Rules/Lan.list

#--- Loon ---#

curl -L -o Tool-repo/Loon/Rules/APNs.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Loon/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Loon/Rules/AppStore.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Loon/Rules/AppleID.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Loon/Rules/AppleMusic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Loon/Rules/iCloud.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Loon/Rules/TestFlight.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Loon/Rules/AppleProxy.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Loon/Rules/OpenAI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Loon/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Loon/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Loon/Rules/Telegram.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Loon/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Loon/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Loon/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Loon/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Loon/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Loon/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Loon/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Loon/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 流媒体
curl -L -o Tool-repo/Loon/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Loon/Rules/Netflix.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Loon/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Loon/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Loon/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Loon/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Loon/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Loon/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Loon/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Loon/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Loon/Rules/Emby.list
# Cloudflare
curl -L -o Tool-repo/Loon/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# PayPal
curl -L -o Tool-repo/Loon/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# 甲骨文
curl -L -o Tool-repo/Loon/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# GFW
curl -L -o Tool-repo/Loon/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Loon/Rules/Trust.list
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Loon/Rules/TronLink.list
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Loon/Rules/Talkatone.list
# 国内规则 
curl -L -o Tool-repo/Loon/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Loon/Rules/WeChat.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Loon/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Loon/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# 游戏规则 
curl -L -o Tool-repo/Loon/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Loon/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Loon/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 广告规则 
curl -L -o Tool-repo/Loon/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Loon/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Loon/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Loon/Rules/Ads_RuCu6.list "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
curl -L -o Tool-repo/Loon/Rules/Ads_limbopro.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Surge/rule/Adblock4limbo_surge.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Loon/Rules/AdGuardChinese.list
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/Loon/Rules/Ads_SukkaW.list
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/Loon/Rules/Reject.list
# fmz200
curl -L -o Tool-repo/Loon/Rules/Direct_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Loon/Rules/Ads_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Loon/Rules/Lan.list

#--- Shadowrocket ---#

# Apple
curl -L -o Tool-repo/Shadowrocket/Rules/APNs.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Shadowrocket/Rules/AppStore.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Shadowrocket/Rules/AppleID.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Shadowrocket/Rules/AppleMusic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Shadowrocket/Rules/iCloud.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Shadowrocket/Rules/TestFlight.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Shadowrocket/Rules/AppleProxy.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Shadowrocket/Rules/OpenAI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Shadowrocket/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Shadowrocket/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Shadowrocket/Rules/Telegram.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Shadowrocket/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Shadowrocket/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Shadowrocket/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 流媒体
curl -L -o Tool-repo/Shadowrocket/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Netflix.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Shadowrocket/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Shadowrocket/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Shadowrocket/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Shadowrocket/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Shadowrocket/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Shadowrocket/Rules/Emby.list
# 甲骨文
curl -L -o Tool-repo/Shadowrocket/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# PayPal
curl -L -o Tool-repo/Shadowrocket/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# Cloudflare
curl -L -o Tool-repo/Shadowrocket/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Shadowrocket/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Shadowrocket/Rules/Trust.list
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Shadowrocket/Rules/TronLink.list
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Shadowrocket/Rules/Talkatone.list
# 国内规则 
curl -L -o Tool-repo/Shadowrocket/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Shadowrocket/Rules/WeChat.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Shadowrocket/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Shadowrocket/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# 游戏规则 
curl -L -o Tool-repo/Shadowrocket/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 广告规则 
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_RuCu6.list "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_limbopro.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Surge/rule/Adblock4limbo_surge.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Shadowrocket/Rules/AdGuardChinese.list
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/Shadowrocket/Rules/Ads_SukkaW.list
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/Shadowrocket/Rules/Reject.list
# fmz200
curl -L -o Tool-repo/Shadowrocket/Rules/Direct_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Shadowrocket/Rules/Ads_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Shadowrocket/Rules/Lan.list


#--- Stash ---#

#### YAML ####
# 苹果
curl -L -o Tool-repo/Stash/Rules/APNs.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Stash/Rules/Apple.yaml "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Stash/Rules/AppStore.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Stash/Rules/AppleID.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Stash/Rules/AppleMusic.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Stash/Rules/iCloud.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Stash/Rules/TestFlight.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Stash/Rules/AppleProxy.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Stash/Rules/OpenAI.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Stash/Rules/Claude.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Stash/Rules/AI.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Stash/Rules/Telegram.yaml "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Stash/Rules/Twitter.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Stash/Rules/Instagram.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Stash/Rules/Facebook.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Stash/Rules/YouTube.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Stash/Rules/Google.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Stash/Rules/Github.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Stash/Rules/OneDrive.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Stash/Rules/Microsoft.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 甲骨文
curl -L -o Tool-repo/Stash/Rules/Oracle.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# 流媒体
curl -L -o Tool-repo/Stash/Rules/TikTok.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Stash/Rules/Netflix.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Stash/Rules/HBO.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Stash/Rules/Disney.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Stash/Rules/Spotify.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Stash/Rules/PrimeVideo.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Stash/Rules/FitnessPlus.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Stash/Rules/AppleMedia.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Stash/Rules/Bahamut.yaml "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Stash/Rules/ProxyMedia.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Stash/Rules/Emby.yaml
# 国内规则 
curl -L -o Tool-repo/Stash/Rules/Bilibili.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Stash/Rules/WeChat.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Stash/Rules/ChinaDomain.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Stash/Rules/ChinaASN.yaml "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# PayPal
curl -L -o Tool-repo/Stash/Rules/PayPal.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# Cloudflare
curl -L -o Tool-repo/Stash/Rules/Cloudflare.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Stash/Rules/ProxyGFW.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Stash/Rules/Trust.yaml
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Stash/Rules/TronLink.yaml
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Stash/Rules/Talkatone.yaml
# 游戏规则 
curl -L -o Tool-repo/Stash/Rules/Game.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Stash/Rules/Steam.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Stash/Rules/Epic.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 广告规则 
curl -L -o Tool-repo/Stash/Rules/Ads_EasyListChina.yaml "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Stash/Rules/Ads_EasyListPrivacy.yaml "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Stash/Rules/Ads_Dlerio.yaml "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Stash/Rules/Ads_RuCu6.yaml "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Stash/Rules/AdGuardChinese.yaml
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/Stash/Rules/Ads_SukkaW.yaml
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/Stash/Rules/Reject.yaml
# fmz200
curl -L -o Tool-repo/Stash/Rules/Direct_fmz200.yaml "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Stash/Rules/Ads_fmz200.yaml "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Stash/Rules/Lan.yaml


#### TEXT ####
# 苹果
curl -L -o Tool-repo/Stash/Rules/APNs.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Stash/Rules/Apple.list "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Stash/Rules/AppStore.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Stash/Rules/AppleID.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Stash/Rules/AppleMusic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Stash/Rules/iCloud.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Stash/Rules/TestFlight.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Stash/Rules/AppleProxy.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Stash/Rules/OpenAI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Stash/Rules/Claude.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Stash/Rules/AI.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Stash/Rules/Telegram.list "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Stash/Rules/Twitter.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Stash/Rules/Instagram.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Stash/Rules/Facebook.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Stash/Rules/YouTube.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Stash/Rules/Google.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Stash/Rules/Github.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Stash/Rules/OneDrive.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Stash/Rules/Microsoft.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 甲骨文
curl -L -o Tool-repo/Stash/Rules/Oracle.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# 流媒体
curl -L -o Tool-repo/Stash/Rules/TikTok.list "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Stash/Rules/Netflix.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Stash/Rules/HBO.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Stash/Rules/Disney.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Stash/Rules/Spotify.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Stash/Rules/PrimeVideo.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Stash/Rules/FitnessPlus.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Stash/Rules/AppleMedia.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Stash/Rules/Bahamut.list "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Stash/Rules/ProxyMedia.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Stash/Rules/Emby.list
# 国内规则 
curl -L -o Tool-repo/Stash/Rules/Bilibili.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Stash/Rules/WeChat.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Stash/Rules/ChinaDomain.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Stash/Rules/ChinaASN.list "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# PayPal
curl -L -o Tool-repo/Stash/Rules/PayPal.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# Cloudflare
curl -L -o Tool-repo/Stash/Rules/Cloudflare.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Stash/Rules/ProxyGFW.list "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Stash/Rules/Trust.list
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Stash/Rules/TronLink.list
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Stash/Rules/Talkatone.list
# 游戏规则 
curl -L -o Tool-repo/Stash/Rules/Game.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Stash/Rules/Steam.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Stash/Rules/Epic.list "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 广告规则 
curl -L -o Tool-repo/Stash/Rules/Ads_EasyListChina.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Stash/Rules/Ads_EasyListPrivacy.list "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Stash/Rules/Ads_Dlerio.list "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Stash/Rules/Ads_RuCu6.list "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Stash/Rules/AdGuardChinese.list
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/Stash/Rules/Ads_SukkaW.list
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/Stash/Rules/Reject.list
# fmz200
curl -L -o Tool-repo/Stash/Rules/Direct_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Stash/Rules/Ads_fmz200.list "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Stash/Rules/Lan.list



#--- Egern ---#

# 苹果
curl -L -o Tool-repo/Egern/Rules/APNs.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/ApplePushNotificationService.list"
curl -L -o Tool-repo/Egern/Rules/Apple.yaml "https://raw.githubusercontent.com/NobyDa/Script/master/Surge/Apple.list"
curl -L -o Tool-repo/Egern/Rules/AppStore.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/source/rule/AppStore/AppStore.list"
curl -L -o Tool-repo/Egern/Rules/AppleID.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleID/AppleID.list"
curl -L -o Tool-repo/Egern/Rules/AppleMusic.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMusic/AppleMusic.list"
curl -L -o Tool-repo/Egern/Rules/iCloud.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/iCloud/iCloud.list"
curl -L -o Tool-repo/Egern/Rules/TestFlight.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TestFlight/TestFlight.list"
curl -L -o Tool-repo/Egern/Rules/AppleProxy.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleProxy/AppleProxy.list"
# OpenAI
curl -L -o Tool-repo/Egern/Rules/OpenAI.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# Claude AI
curl -L -o Tool-repo/Egern/Rules/Claude.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Claude.list"
# AIGC
curl -L -o Tool-repo/Egern/Rules/AI.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/AI.list"
# 社交媒体
curl -L -o Tool-repo/Egern/Rules/Telegram.yaml "https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Rules/Telegram.list"
curl -L -o Tool-repo/Egern/Rules/Twitter.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list"
curl -L -o Tool-repo/Egern/Rules/Instagram.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list"
curl -L -o Tool-repo/Egern/Rules/Facebook.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list"
# 谷歌
curl -L -o Tool-repo/Egern/Rules/YouTube.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list"
curl -L -o Tool-repo/Egern/Rules/Google.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list"
# 微软
curl -L -o Tool-repo/Egern/Rules/Github.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list"
curl -L -o Tool-repo/Egern/Rules/OneDrive.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OneDrive.list"
curl -L -o Tool-repo/Egern/Rules/Microsoft.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Microsoft.list"
# 甲骨文
curl -L -o Tool-repo/Egern/Rules/Oracle.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Oracle/Oracle.list"
# 流媒体
curl -L -o Tool-repo/Egern/Rules/TikTok.yaml "https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Rule/TikTok.list"
curl -L -o Tool-repo/Egern/Rules/Netflix.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Netflix/Netflix.list"
curl -L -o Tool-repo/Egern/Rules/HBO.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.list"
curl -L -o Tool-repo/Egern/Rules/Disney.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.list"
curl -L -o Tool-repo/Egern/Rules/Spotify.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.list"
curl -L -o Tool-repo/Egern/Rules/PrimeVideo.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PrimeVideo/PrimeVideo.list"
curl -L -o Tool-repo/Egern/Rules/FitnessPlus.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/FitnessPlus/FitnessPlus.list"
curl -L -o Tool-repo/Egern/Rules/AppleMedia.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/AppleMedia/AppleMedia.list"
curl -L -o Tool-repo/Egern/Rules/Bahamut.yaml "https://github.com/ACL4SSR/ACL4SSR/raw/master/Clash/Ruleset/Bahamut.list"
curl -L -o Tool-repo/Egern/Rules/ProxyMedia.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list"
cp -r Tool-repo/Surge/Rules/Emby.list Tool-repo/Egern/Rules/Emby.yaml
# PayPal
curl -L -o Tool-repo/Egern/Rules/PayPal.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/PayPal/PayPal.list"
# Cloudflare
curl -L -o Tool-repo/Egern/Rules/Cloudflare.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Cloudflare/Cloudflare.list"
# GFW
curl -L -o Tool-repo/Egern/Rules/ProxyGFW.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list"
# Trust
cp -r Tool-repo/Surge/Rules/Trust.list Tool-repo/Egern/Rules/Trust.yaml
# TronLink
cp -r Tool-repo/Surge/Rules/TronLink.list Tool-repo/Egern/Rules/TronLink.yaml
# Talkatone
cp -r Tool-repo/Surge/Rules/Talkatone.list Tool-repo/Egern/Rules/Talkatone.yaml
# 国内规则 
curl -L -o Tool-repo/Egern/Rules/Bilibili.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list"
curl -L -o Tool-repo/Egern/Rules/WeChat.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Wechat.list"
curl -L -o Tool-repo/Egern/Rules/ChinaDomain.yaml "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list"
curl -L -o Tool-repo/Egern/Rules/ChinaASN.yaml "https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list"
# 游戏规则 
curl -L -o Tool-repo/Egern/Rules/Game.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.list"
curl -L -o Tool-repo/Egern/Rules/Steam.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Steam/Steam.list"
curl -L -o Tool-repo/Egern/Rules/Epic.yaml "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Epic/Epic.list"
# 广告规则 
curl -L -o Tool-repo/Egern/Rules/Ads_EasyListChina.yaml "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easylistchina_surge.list"
curl -L -o Tool-repo/Egern/Rules/Ads_EasyListPrivacy.yaml "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/rule/Surge/easyprivacy_surge.list"
curl -L -o Tool-repo/Egern/Rules/Ads_Dlerio.yaml "https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Reject.list"
curl -L -o Tool-repo/Egern/Rules/Anti-ad.yaml "https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt"
curl -L -o Tool-repo/Egern/Rules/Ads_RuCu6.yaml "https://raw.githubusercontent.com/RuCu6/QuanX/main/Rules/MyBlockAds.list"
cp -r Tool-repo/Surge/Rules/AdGuardChinese.list Tool-repo/Egern/Rules/AdGuardChinese.yaml
cp -r Tool-repo/Surge/Rules/Ads_SukkaW.list Tool-repo/Egern/Rules/Ads_SukkaW.yaml
cp -r Tool-repo/Surge/Rules/Reject.list Tool-repo/Egern/Rules/Reject.yaml
# fmz200
curl -L -o Tool-repo/Egern/Rules/Direct_fmz200.yaml "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliuxiuzheng.list"
curl -L -o Tool-repo/Egern/Rules/Ads_fmz200.yaml "https://raw.githubusercontent.com/fmz200/wool_scripts/main/QuantumultX/filter/fenliu.list"
# Lan
cp -r Tool-repo/Surge/Rules/Lan.list Tool-repo/Egern/Rules/Lan.yaml


#--- GeoIP ---#

mkdir -p Tool-repo/GeoIP
curl -L -o Tool-repo/GeoIP/CN_Country.mmdb "https://raw.githubusercontent.com/Masaiki/GeoIP2-CN/release/Country.mmdb"
curl -L -o Tool-repo/GeoIP/Global_Country.mmdb "https://raw.githubusercontent.com/Loyalsoldier/geoip/release/Country.mmdb"


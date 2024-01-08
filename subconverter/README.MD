_自建订阅转换可以有效防止订阅泄露以及规则下载不全等问题_

> 订阅转换后端项目地址：[subconverter](https://github.com/tindy2013/subconverter)


Windos系统中的使用方法
---

* 转换时确保可以正常访问Github；如无法访问，在`https://raw.githubusercontent.com`前添加`https://ghproxy.com/`
* 点击下载[subconverter_win64.7z](https://github.com/tindy2013/subconverter/releases/download/v0.7.2/subconverter_win64.7z)
* 解压至本地，双击`subconverter.exe`，等待命令窗弹出
* 按需求修改并复制转换规则至浏览器，回车打开，确认规则是否完整
* 更新链接时必须运行`subconverter.exe`

**_转换规则_**
    
   - 完整配置(可直接导入使用)

```
http://localhost:25500/sub?target=clash&insert=true&new_name=true&scv=true&url=机场订阅地址&config=自己专属的ini配置文件
```
  - `Node List`配置（只包含节点信息）

```
http://localhost:25500/sub?target=clash&insert=true&new_name=true&scv=true&url=机场订阅地址&list=true
```

**_自用ini配置文件_**

<details>
  <summary>多国家 流媒体 自动最低延迟</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡、澳大利亚、英国、印度）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体(Youtube、HBO、Netflix、TikTok、Disney、Spotify、PrimeVideo)
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://github.com/Repcz/Tool/raw/X/Clash/Premium/Online_Full_Auto.ini
```

<details>
  <summary>多国家 流媒体 手动选择</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡、澳大利亚、英国、印度）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体(Youtube、HBO、Netflix、TikTok、Disney、Spotify、PrimeVideo)
- [ ] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://github.com/Repcz/Tool/raw/X/Clash/Premium/Online_Full_NoAuto.ini
```






Docker中的使用方法
---
* 确保服务器可以正常访问Github
* 在终端中输入
```
docker run -d --restart=always -p 25500:25500 tindy2013/subconverter:latest
```
* 等待1分钟，运行以下命令，如看见` subconverter vx.x.x backend `即正常运行
```
curl http://localhost:25500/version
```
* 按需求修改并复制转换规则至浏览器，回车打开，确认规则是否完整
* 如果访问异常，请重启docker并等待1分钟后重试

**_转换规则_**
    
   - 完整配置(可直接导入使用)

```
http://服务器地址:25500/sub?target=clash&insert=true&new_name=true&scv=true&url=机场订阅地址&config=自己专属的ini配置文件
```
  - `Node List`配置（只包含节点信息）

```
http://服务器地址:25500/sub?target=clash&insert=true&new_name=true&scv=true&url=机场订阅地址&list=true
```

**_自用ini配置文件_**

<details>
  <summary>多国家 流媒体 自动最低延迟</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡、澳大利亚、英国、印度）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体(Youtube、HBO、Netflix、TikTok、Disney、Spotify、PrimeVideo)
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://github.com/Repcz/Tool/raw/X/Clash/Premium/Online_Full_Auto.ini
```

<details>
  <summary>多国家 流媒体 手动选择</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡、澳大利亚、英国、印度）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体(Youtube、HBO、Netflix、TikTok、Disney、Spotify、PrimeVideo)
- [ ] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://github.com/Repcz/Tool/raw/X/Clash/Premium/Online_Full_NoAuto.ini
```


参数说明
---
| 调用参数   | 必要性 | 示例                        | 解释                                                                                                                  |
| ------ | :-: | :------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| target |  必要 | target=clash               | 指想要生成的配置类型，详见 [支持类型](#支持类型) 中的参数                                                                                  |
| insert        |  可选 | true / false              | 用于设置是否将配置文件中的 `insert_url` 插入，默认为 true                                                                                                                                                                      |
| new_name      |  可选 | true / false              | 如果设置为 true，则将启用 Clash 的新组名称 (proxies, proxy-groups, rules)                                                                                                                                                  |
| scv           |  可选 | true / false              | 用于关闭 TLS 节点的证书检查，默认为 false                                                                                                                                                                                  |
| url    |  必要 | url=机场订阅地址             | 指机场所提供的订阅链接或代理节点的分享链接                                              |
| config |  可选 | config=自己专属的ini配置文件 | 指 外部配置 的地址 (包含分组和规则部分)，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，详见 [外部配置](https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E5%A4%96%E9%83%A8%E9%85%8D%E7%BD%AE) ，当此参数不存在时使用 主程序目录中的配置文件 |
| list          |  可选 | true / false              | 用于输出 Surge Node List 或者 Clash Proxy Provider 或者 Quantumult (X) 的节点订阅 或者 解码后的 SIP002                                                                                                                         |
> 更多参数调用参阅[调用说明 (进阶)](https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%B0%83%E7%94%A8%E8%AF%B4%E6%98%8E-%E8%BF%9B%E9%98%B6)



***
本文参考:
* [subconverter/README-cn.md](https://github.com/tindy2013/subconverter/blob/master/README-cn.md#subconverter)
* [自建clash订阅转换subconverter后端并配置规则](https://s1oz.github.io/post/zi-jian-clash-ding-yue-zhuan-huan-hou-duan-bing-pei-zhi-gui-ze/) 
* [解决订阅转换节点被盗用和无法转换大量节点，本地订阅转换教程](https://www.youtube.com/watch?v=UxvjT_nHLo4)

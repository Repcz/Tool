# Loon

### Loon 下载地址

<a href="https://apps.apple.com/app/id1373567447"><img width="200px" alt="Download on App Store" src="https://logos-download.com/wp-content/uploads/2016/06/Download_on_the_App_Store_logo.png"/></a>  

***



> 配置参数解释见：应用内**示例配置**及[Loon官方文档](https://loon0x00.github.io/LoonManual)

### 1.导入 **配置文件** ：
* 点击 [链接](https://www.nsloon.com/openloon/import?sub=https://raw.githubusercontent.com/Repcz/Tool/X/Loon/Loon.conf) 一键导入配置文件
* 或在 **设置** 中，找到 **编辑** 区域，点击 **从URL下载** 
* 复制以下链接，并粘贴到 **URL**

<details>
  <summary>Loon.conf</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [ ] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://raw.githubusercontent.com/Repcz/Tool/X/Loon/Loon.conf
```

### 2.为配置文件生成证书
* 点击 **设置** ，在下方 **MitM** 区域，点击 **证书管理**
* 点击 **生成新的CA证书** -**安装CA证书**
* 弹出提示后，在Safari中 **允许** 下载配置文件
![Image text](https://github.com/Repcz/Tool/blob/X/Loon/Photo/IMG_2112.PNG) 

### 3.设置中安装描述文件
* 在 **系统设置** 中，点击 **已下载描述文件** ，并 **安装**
![Image text](https://github.com/Repcz/Tool/blob/X/QuantumultX/Photo/%E8%AE%BE%E7%BD%AE-%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6.jpg)

### 4.导入机场订阅
* 点击 **设置** ，在最上方 **节点** 区域，点击 **所有节点**
* 长按 **Subscribe** - **编辑**
* 复制 **机场订阅** 链接，并粘贴到 **URL**
![1](https://github.com/Repcz/Tool/blob/X/Loon/Photo/IMG_2119.PNG)

* 或者配置替换文件 [Remote Proxy] 中的 `http://your-service-provider`
```yaml
[Remote Proxy]
# 将下方http://your-service-provider替换为机场订阅
Subscribe = http://your-service-provider,udp=true,fast-open=true,vmess-aead=true,enabled=true
```

### 5.设置代理模式
* 点击 **设置** ，在最下方 **其他** 区域，点击 **高级配置**
* 在最下方 **代理模式** 中选择 **TUN Only**


<details>
  <summary>按需启用响应ssid策略</summary>

### 6.设置响应ssid环境下使用的策略
* 按需修改 [General] 中的 `ssid-trigger`
```yaml
[General]
# "WIFI SSID":DIRECT，表示在WIFI SSID这个wifi网络下使用全局直连模式，根据需要修改WIFI SSID
# "cellular":PROXY，表示在蜂窝网络下使用自动分流模式
# "default":RULE，默认使用自动分流模式
ssid-trigger = "default":rule, "cellular":rule,"WIFI SSID":DIRECT
```

</details>



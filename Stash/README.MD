
### Stash 下载地址

<a href="https://apps.apple.com/app/id1596063349"><img width="200px" alt="Download on App Store" src="https://logos-download.com/wp-content/uploads/2016/06/Download_on_the_App_Store_logo.png"/></a>  


> **_Stash_** 自带 **Sub-Store**，机场订阅本地转换可参考[Sub-Store 教程](https://getupnote.com/share/notes/8SiMnOcwXxZ3xEtK4k2v9Gr3pv32/7522F394-6D73-414E-BE04-1455EDB15B9F)

### 1. 导入并修改配置


* **设置** - **配置文件** - **从URL下载**
* 点击下方配置旁链接名称可直接导入
<details>
  <summary> [Stash.yaml](https://link.stash.ws/install-config/raw.githubusercontent.com/Repcz/Tool/X/Stash/Stash.yaml) </summary>

- [ ] 使用GeoSITE&GeoIP
- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽

</details>

```
https://github.com/Repcz/Tool/raw/X/Stash/Stash.yaml
```


<details>
  <summary> [Stash_lite.yaml](https://link.stash.ws/install-config/raw.githubusercontent.com/Repcz/Tool/X/Stash/Stash_lite.yaml) </summary>

- [x] 使用GeoSITE&GeoIP
- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [ ] 故障转移
- [x] 广告屏蔽
- [x] 内存占用更低？

</details>

```
https://raw.githubusercontent.com/Repcz/Tool/X/Stash/Stash_lite.yaml
```

* 请自行替换 `subscribe-url` 和 `proxy-providers` 中的`http://your-service-provider`
```
# > 订阅的信息展示
subscribe-url: http://your-service-provider

proxy-providers:
# > 远程服务器
 Subscribe: {<<: *p, url: http://your-service-provider}
```
![修改配置](https://github.com/Repcz/Tool/blob/X/Stash/Photo/stash1.jpg)

### 2. 更新远程资源
* 启动Stash
* 下方 **策略组** 中，左上角 **下载** ，更新 **远程资源**
![更新资源](https://github.com/Repcz/Tool/blob/X/Stash/Photo/stash2.jpg)

### 3. 更新**GeoIP数据库**
> 项目地址：[Loyalsoldier/geoip](https://github.com/Loyalsoldier/geoip)
* 点击底部工具栏 **设置** ，点击配置模块中的 **更多设置**
* 在 **GEOIP数据库** 模块中的URL填入以下地址 ，并更新
```
https://cdn.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb
```
![3](https://github.com/Repcz/Tool/blob/X/Stash/Photo/stash3.jpg)

### 策略组修改为手动选择节点
> 默认为自动选择延迟最低节点，**按需** 修改为手动选择
* 在 **策略组** 下的分流策略组中选择需要的地区节点，此处以 **国外网站** 举例，选择 **香港节点**
* 在 **设置** 中的 **编辑** 模块，点击 **可视化编辑** 
* 在 **可视化编辑** - **策略组** 中，找到 **香港节点** 此时该策略组以 `URL TEST` 运行，即按最低延迟选择节点
* 如果要修改为手动选择节点，则点击 **香港节点** 策略组， **类型** 选择 `SElECT`，并保存
* 在 **香港节点** 策略组中选择需要的节点，则 **国外网站** 策略组走 **香港节点** 中选择的节点
![4](https://github.com/Repcz/Tool/blob/X/Stash/Photo/stash4.jpg)

# Surge

### Surge iOS 下载地址

<a href="https://apps.apple.com/app/id1442620678"><img width="200px" alt="Download on App Store" src="https://logos-download.com/wp-content/uploads/2016/06/Download_on_the_App_Store_logo.png"/></a>  


导入配置
---

### 1.添加 **配置文件** 
> 配置参数解释见：_[GetSomeCats/Surge](https://raw.githubusercontent.com/getsomecat/GetSomeCats/Surge/SurgePro.conf)_

```
https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Surge.conf
```
* 运行 **Surge** ，在 **首页** ， 点击 **顶部区域**
* 弹出的 **设置** 菜单中，在下方 **导入** 区域，点击 **从URL下载配置**
* 将配置文件链接填入并保存
<img width="600px"  src="https://github.com/Repcz/Tool/blob/X/Surge/Photo/1.PNG"/>

### 2.添加机场订阅
> 机场订阅本地转换可参考[Sub-Store 教程](https://getupnote.com/share/notes/8SiMnOcwXxZ3xEtK4k2v9Gr3pv32/7522F394-6D73-414E-BE04-1455EDB15B9F)

*  在 **首页**  —— **通用** 中， 点击 **代理服务器** 
* 弹出的菜单中，在 **策略组** 最下方 ，点击 **新的策略组**
* **组名称** 填写为 机场名称，并下拉至最下方
* 勾选 **使用外部代理列表** ，并填写 **机场订阅**

![Image text](https://github.com/Repcz/Tool/blob/X/Surge/Photo/2.PNG) 

### 3.将 机场订阅策略组 导入 手动选择策略组

*  在 **首页**  —— **通用** ， 点击 **代理服务器** 
* 弹出的菜单中，在 **策略组** 最上方 ，点击 **手动选择**，并在弹出的菜单中，下拉至最下方
* 点击 **包含另一个策略组的策略** ，在弹出的页面中，勾选刚才生成的 包含机场订阅的策略组

> 此时，`手动选择`策略组 即为显示所有节点的策略组；如果要添加多个机场，重复 2、3 步骤即可


![Image text](https://github.com/Repcz/Tool/blob/X/Surge/Photo/3.PNG) 

### 4.为配置文件生成证书
* 在 **首页**  —— **修改** ，点击 **MitM** 区域的 **配置根证书** 
* 弹出的菜单中，点击 **生成新的CA证书**
* 在弹出的菜单中，点击 **安装证书**
![Image text](https://github.com/Repcz/Tool/blob/X/Surge/Photo/4.PNG) 

* **确定** 提示后，在Safari中 **允许** 下载配置文件
* 并勾选 **MitM** 、**Rewrite** 、**脚本** 的开关

### 5.设置中安装描述文件
> 此处借用QX的图

* 在 **系统设置** 中，点击 **已下载描述文件** ，并 **安装**
![Image text](https://github.com/Repcz/Tool/blob/X/QuantumultX/Photo/%E8%AE%BE%E7%BD%AE-%E5%AE%89%E8%A3%85%E8%AF%81%E4%B9%A6.jpg)

### 6.设置中信任描述文件
* 在 **系统设置** - **通用** - **关于本机** - **证书信任设置** 中，勾选已安装的描述文件
![Image text](https://github.com/Repcz/Tool/blob/X/QuantumultX/Photo/%E8%AE%BE%E7%BD%AE-%E4%BF%A1%E4%BB%BB%E8%AF%81%E4%B9%A6.jpg)

### 7.导入模块
* **首页** —— **通用** —— **模块** 中，点击 **模块** 按钮
* 弹出的页面中，下滑至 **安装的模块** 最下方，点击 **安装新模块**
* 将模块链接(raw链接)填入并保存，等待下载外部资源
* 下载完成后，点击最下方的 **调整生效顺序**，按需调整模块生效顺序（按需）

![Image text](https://github.com/Repcz/Tool/blob/X/Surge/Photo/5.PNG) 

<details>
  <summary>自用模块</summary>

自用模块
---
> 以`http://script.hub`开头的模块，需安装[ScriptHub模块](https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/modules/script-hub.surge.sgmodule)后使用！！具体使用方法见[ScriptHub项目官方](https://github.com/Repcz/Open-Proflies/wiki/Script-Hub)

### 功能类

- ScriptHub资源转换模块 [@ScriptHub](https://github.com/Repcz/Open-Proflies/wiki/Script-Hub)
```
https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/modules/script-hub.surge.sgmodule
```

- B站繁体字幕翻译 [@ddkgsf2013](https://github.com/ddkgsf2013)
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/ddgksf2013/Rewrite/master/Function/Bilibili_CC.conf/_end_/Bilibili_CC.sgmodule?n=%E5%8A%9F%E8%83%BD%EF%BD%9CB%E7%AB%99%E5%AD%97%E5%B9%95%E7%BF%BB%E8%AF%91%2B%40ddkgsf2013&type=qx-rewrite&target=surge-module
```

- NetISP 面板 [@Keywos](https://github.com/Keywos)
```
https://github.com/Keywos/rule/raw/main/module/NetIspmini.sgmodule
```

> 须搭配此分流一同使用
```
DOMAIN-SUFFIX,ip.api.com,PROXY
```

- QX Url Scheme 资源解析 [@chengkongyiban](https://github.com/chengkongyiban)
> 复制QX Url Scheme格式的资源到浏览器打开
```
https://github.com/Repcz/Tool/raw/X/Surge/Module/QX-resource-preview.sgmodule
```

- 京东历史价格 [@githubdulong](https://github.com/githubdulong)
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/githubdulong/Script/master/jd_price2.sgmodule/_end_/jd_price2.sgmodule?n=%E5%8A%9F%E8%83%BD%EF%BD%9C%E4%BA%AC%E4%B8%9C%E5%8E%86%E5%8F%B2%E4%BB%B7%E6%A0%BC%2B%40githubdulong&type=surge-module&target=surge-module
```



### 去广告类

- YouTube去广告+YouTubeMusic歌词翻译 [@Maasea](www.github.com/Maasea)
```
https://raw.githubusercontent.com/Maasea/sgmodule/master/YoutubeAds.sgmodule
```

- Keep去广告 [@Maasea](www.github.com/Maasea)
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/Maasea/sgmodule/master/KeepAds.sgmodule/_end_/KeepAds.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9CKeep%2B%40Maasea&type=surge-module&target=surge-module
```

- IT之家去广告 [@Keywos](https://github.com/Keywos) [@kokoryh](https://github.com/kokoryh) 
```
https://raw.githubusercontent.com/Repcz/Tool/X/Surge/Module/Ads_IT_Home.sgmodule
```

- MyBlockAds [@RuCu6](https://github.com/RuCu6)

> 去广告维护列表[点此查看](https://t.me/GitCube/21)，须搭配下方分流一起使用
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/MyBlockAds.conf/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9CMyblockAds.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9CMyblockAds%2B%40RuCu6&type=qx-rewrite&target=surge-module&del=true
```

```
RULE-SET,https://github.com/Repcz/Tool/raw/X/Surge/Rules/Ads_RuCu6.list,REJECT
```

- 菜鸟去广告 [@RuCu6](https://github.com/RuCu6)
```
https://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/cainiao.snippet/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E8%8F%9C%E9%B8%9F.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E8%8F%9C%E9%B8%9F%2B%40RuCu6&type=qx-rewrite&target=surge-module
```

- 高德地图去广告 [@RuCu6](https://github.com/RuCu6) [@kokoryh](https://github.com/kokoryh) 
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/amap.snippet/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E9%AB%98%E5%BE%B7%E5%9C%B0%E5%9B%BE%2B%20%40RuCu6%20kokoryh&type=qx-rewrite&target=surge-module
```

- 微博去广告 [@RuCu6](https://github.com/RuCu6) [@zmqcherish](https://github.com/zmqcherish) 
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/weibo.snippet/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E5%BE%AE%E5%8D%9A.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E5%BE%AE%E5%8D%9A%2B%40RuCu6&type=qx-rewrite&target=surge-module
```

- 微博国际版去广告 [@Keywos](https://github.com/Keywos) [@kokoryh](https://github.com/kokoryh) 
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/Keywos/rule/main/module/weibous.sgmodule/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E5%BE%AE%E5%8D%9A%E5%9B%BD%E9%99%85%E7%89%88.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E5%BE%AE%E5%8D%9A%E5%9B%BD%E9%99%85%E7%89%88%2B%40keywos%40kokoryh&type=surge-module&target=surge-module
```

- 小红书去广告 [@RuCu6](https://github.com/RuCu6) [@fmz200](https://github.com/fmz200) 
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/xiaohongshu.snippet/_end_/xiaohongshu.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E5%B0%8F%E7%BA%A2%E4%B9%A6%2B%40RuCu6&type=qx-rewrite&target=surge-module
```

- 知乎去广告 [@RuCu6](https://github.com/RuCu6)
```
http://script.hub/file/_start_/https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/zhihu.snippet/_end_/zhihu.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E7%9F%A5%E4%B9%8E%2B%40RuCu6&type=qx-rewrite&target=surge-module
```

- 什么值得买去广告 [@ZenmoFeiShi](https://github.com/ZenmoFeiShi)
```
http://script.hub/file/_start_/https://gitlab.com/lodepuly/vpn_tool/-/raw/master/Tool/Loon/Plugin/smzdm_remove_ads.plugin/_end_/%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E4%BB%80%E4%B9%88%E5%80%BC%E5%BE%97%E4%B9%B0.sgmodule?n=%E5%8E%BB%E5%B9%BF%E5%91%8A%EF%BD%9C%E4%BB%80%E4%B9%88%E5%80%BC%E5%BE%97%E4%B9%B0%2B%40ZenmoFeiShi&type=loon-plugin&target=surge-module&del=true
```


</details>
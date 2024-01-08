# Clash 客户端入门使用方法

## 写在前面：
由于之前某些`为了流量不要妈的人`将 Clash for Windows 删除 release 的事情，发布至国内平台，造成如今各类相关程序或删库或归档。希望不要将相关信息在任何国内平台传播。

本文亦禁止在任何国内平台转载或传播。


## Clash Verge 使用方法

### Clash Verge 下载

* [clash-verge](https://github.com/zzzgydi/clash-verge/releases)：原版，受Clash事件影响，已停止更新，仓库归档

* [clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev/releases)：分支版本，优化UI，跟进Mihomo(ClashMeta)内核更新，目前开发者活跃，图标比较丑

* [clash-nyanpasu](https://github.com/keiko233/clash-nyanpasu/releases)：分支版本，优化UI，跟进Mihomo(ClashMeta)内核更新，图标好看

* [clash-verge](https://github.com/MetaCubeX/clash-verge/releases)：分支版本，由MetaCubeX维护，跟进Mihomo(ClashMeta)内核更新

近几年绝大多数的 Windows 系统电脑，选择 `Clash.Verge_x.x.x_x64-setup.exe` 下载安装即可；

如果是老一点的WIN PC，可下载安装 `Clash.Verge_x.x.x_x86-setup.exe` （请根据自身处理器架构选择）; 

MAC 系统请依据自身处理器架构选择对应版本。

> 如果 Windows 系统电脑无法运行安装程序，需要安装 [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/?form=MA13LH#download-section)

---

### Clash Verge 本地配置使用方法

> 此配置的意义在于：自定义配置，无需使用订阅转换，且不会被机场下发的配置覆盖。
>
> 由于下载规则集文件需要使用代理，建议使用该配置前先导入机场配置。
>
> 部分分支对UI进行修改，存在一定差异，此处以clash-verge-rev进行演示

#### 1.下载配置文件到本地

<details>
  <summary>ClashVerge.yaml</summary>

- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [x] 故障转移
- [x] 广告屏蔽

</details>

```
https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/ClashVerge.yaml
```

#### 2. 修改配置 `proxy-providers` 机场订阅地址

> 在第100行修改

```yaml
proxy-providers:
  Subscribe: {<<: *p, path: ./proxy-providers/Sub.yaml, url: http://your-service-provider}
    # 在此将"http://your-service-provider"替换为你的机场订阅，推荐使用base64或者node list
    # Sub-Store生成的链接,可以直接替换上述url引号中的部分,具体见Sub-Store教程         
```
Mihomo(ClashMeta)内核支持解析base64格式的订阅，可按照下图提示复制机场订阅

![1](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/1.png)


#### 3. Clash Verge 中导入 **配置/订阅**
> WIN系统第一次启动会要求允许防火墙权限，允许即可；部分客户端第一次启动显示英文，可进入设置修改；
* 打开Clash Verge，点击左侧 **配置/订阅**，点击右上角**新建**
* 类型选择**Local**，点击下方 **选择文件**，选择修改好的文件
* 对导入的配置选中，并点击右键 → **启用/使用**
* 等待右上角提示 **Refresh clash config** 后, 点击左侧 **设置** → 勾选 **系统代理** （右下角托盘里右键图标亦可更改）
* 点击左侧 **代理** ，按需设置对应的分流

![5](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/5.png)

![6](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/6.png)


---

### 多机场配置

参考上方的说明将机场订阅填入，如果还需要写入更多机场，可以参照下方 #按需添加代理提供商（proxy-provider）


<details>
  <summary>ClashVerge_②.yaml</summary>

- [x] 适配同时使用两个机场
- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [x] 故障转移
- [x] 广告屏蔽

</details>

```
https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/ClashVerge_②.yaml
```

<details>
  <summary>ClashVerge_③.yaml</summary>

- [x] 适配同时使用三个机场
- [x] 地区分流（香港、美国、日本、台湾、新加坡）
- [x] 苹果、谷歌、微软、电报、推特分流
- [x] 流媒体（不支持单独分流）
- [x] 自动选择最低延迟
- [ ] 负载均衡
- [x] 故障转移
- [x] 广告屏蔽

</details>

```
https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/ClashVerge_③.yaml
```

---
### 解除UWP应用回环限制

* 应用目录的`resources文件夹`下双击运行 `enableLoopback.exe`
* 全选软件(Ctrl+A)，勾选前方任意选项框，点击工具栏的 **Save Changes**

---

### 按需设置 TUN模式
> 由于部分软件并不使用系统代理，因此需要设置TUN模式强制接管这些流量，比如Emby客户端

* 点击左侧 **设置** ，点击 **服务模式** 右边的盾牌🛡 → 点击 **INSTALL**，

* 安装完成后，勾选 **服务模式** 右侧的选项，勾选 **TUN 模式** ，并取消勾选 **系统代理**

* 如果此前其他ClashVerge安装过 **服务模式**，需要在应用目录的`resources文件夹`下双击运行 `uninstall-service.exe` 后，再进行上方的安装步骤

![7](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/7.png)
![8](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/8.png)

---

<details>
  <summary>修改策略组类型</summary>

### 按需修改策略组类型（自动选择/手动选择/故障回退/负载均衡）

默认地区/国家策略组，全部为自动选择最低延迟，测试地址为：`http://www.gstatic.com/generate_204` , 测试间隔：900秒

* 点击左侧 **配置/订阅** → 找到使用的配置并右键 → **修改配置**
* 找到第140行 `- {name: 🇭🇰 香港节点, <<: *auto, filter: ...."}`，将 `*auto` 修改为 `*select`；注意修改后的`<<: *select`中的 `*` 前面有空格
- `自动选择`策略组对应 `*auto`
- `手动选择`策略组对应 `*select`
- `故障回退`策略组对应 `*fallback`
- `负载均衡`策略组对应 `*load-balance`

eg:
```yaml
proxy-groups:
...

  - {name: 🇭🇰 香港节点, <<: *auto, filter: "^(?=.*((?i)🇭🇰|香港|(\b(HK|Hong)\b)))(?!.*((?i)回国|校园|游戏|(\b(GAME)\b))).*$"}
```

👇
```yaml
proxy-groups:
...

  - {name: 🇭🇰 香港节点, <<: *select, filter: "^(?=.*((?i)🇭🇰|香港|(\b(HK|Hong)\b)))(?!.*((?i)回国|校园|游戏|(\b(GAME)\b))).*$"}
```

</details>

---

<details>
  <summary>添加策略组</summary>

### 按需添加策略组

如果需要添加**筛选节点用的地区/国家策略组**，可以按照如下格式将策略组填写在`proxy-groups`下方

注意：`-` 前面有两个空格，不要使用Tab进行缩进，使用英文`,` ，符号后有空格

eg:
```yaml
proxy-groups:
...

  - {name: 地区策略组名称1, <<: *auto, filter: "正则表达式"}

  - {name: 地区策略组名称2, <<: *select, filter: "正则表达式"}

  - {name: 地区策略组名称3, <<: *fallback, filter: "正则表达式"}
```

并且需要在 第71行 添加 **对应的策略组名称**

这样所有策略组中带有`*pg`的策略组都会添加此策略组

eg:
```yaml
pg: &pg {type: select, proxies: [🚀 手动切换, 🇭🇰 香港节点, 🇺🇸 美国节点, 🇸🇬 狮城节点, 🇯🇵 日本节点,  🇨🇳 台湾节点, ♻️ 自动选择, ⚠️ 故障转移, DIRECT]}
```

👇
```yaml
...
pg: &pg {type: select, proxies: [🚀 手动切换, 🇭🇰 香港节点, 🇺🇸 美国节点, 🇸🇬 狮城节点, 🇯🇵 日本节点,  🇨🇳 台湾节点, 地区策略组名称1, ♻️ 自动选择, ⚠️ 故障转移, DIRECT]}
```

---

如果需要自定义**策略组需要包含哪些策略组**，可以按照如下格式将策略组填写在`proxy-groups`下方

注意：`-` 前面有两个空格，不要使用Tab进行缩进，使用英文`,` ，符号后有空格

```yaml
proxy-groups:
...

  - {name: 📺 哔哩哔哩, type: select, proxies: [DIRECT, 🇭🇰 香港节点, 🇨🇳 台湾节点]}
```

---

如果希望某个策略组包含某个机场(proxy-providers)的所有节点，或者对其单独筛选，可以按照如下格式将策略组填写在`proxy-groups`下方

- `use: [Subscribe]`：表示该策略组将包含这个`proxy-provider`的所有节点，`[Subscribe]`必须是`proxy-providers`中存在的；可以写多个，例如`[Subscribe1, Subscribe2, Subscribe3]`

- 如果后面写上`filter: "正则表达式"`，则将会对`Subscribe`这个`proxy-provider`的节点进行筛选

- `use: [Subscribe]` 和 `filter: "正则表达式"` 都是可选项

注意：`-` 前面有两个空格，不要使用Tab进行缩进，使用英文`,` ，符号后有空格

```yaml
proxy-groups:
...

  - {name: 🚀 手动切换, type: select, use: [Subscribe], proxies: [🇭🇰 香港节点, 🇺🇸 美国节点, 🇸🇬 狮城节点, 🇯🇵 日本节点, 🇨🇳 台湾节点, DIRECT]}
```
</details>


---

<details>
  <summary>添加代理提供商（proxy-provider）</summary>

### 按需添加代理提供商（proxy-provider）

> 可以参考上方的多机场配置

可以按照如下格式将策略组填写在`proxy-providers`下方

注意：proxy-provider 的名称前面有两个空格，不要使用Tab进行缩进，使用英文`,` ，符号后有空格


```yaml
proxy-providers:
  Subscribe: {<<: *p, path: ./proxy-providers/Sub.yaml, url: http://your-service-provider}
```

👇
```yaml
proxy-providers:
  Subscribe: {<<: *p, path: ./proxy-providers/Sub.yaml, url: http://your-service-provider}

  Subscribe2: {<<: *p, path: ./proxy-providers/Sub2.yaml, url: http://your-service-provider}
```

同时需要修改所有的`use:`参数，建议使用全局替换，将`use: [Subscribe]`替换为`use: [Subscribe, Subscribe2]`

</details>


---

<details>
  <summary>添加分流规则</summary>

### 按需添加分流规则

> 以下内容参考：
> - [Clash 规则](https://clash.wiki/configuration/rules.html)
> - [虚空终端 规则配置](https://wiki.metacubex.one/config/rules/)

Clash的规则都在写`rule`下方，其格式如下 (MATCH / IP类规则 除外）
```
# 类型,参数,策略(,no-resolve)
TYPE,ARGUMENT,POLICY(,no-resolve)
```

规则将按照从上到下的顺序匹配，列表顶部的规则优先级高于其底下的规则

最末尾规则一定是 MATCH 规则，当所有规则都不匹配时使用该规则。

以下是一个示例，请不要照抄：

```yaml
rules:
  - DOMAIN-SUFFIX,google.com,auto
  - DOMAIN-KEYWORD,google,auto
  - DOMAIN,ad.com,REJECT
  - SRC-IP-CIDR,192.168.1.201/32,DIRECT
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR6,2620:0:2d0:200::7/32,auto
  - GEOIP,CN,DIRECT
  - DST-PORT,80,DIRECT
  - SRC-PORT,7777,DIRECT
  - IN-TYPE,SOCKS/HTTP,auto
  - AND,((DOMAIN,baidu.com),(NETWORK,UDP)),DIRECT
  - OR,((NETWORK,UDP),(DOMAIN,baidu.com)),REJECT
  - NOT,((DOMAIN,baidu.com)),PROXY
  - RULE-SET,providername,proxy
  - PROCESS-NAME,curl,PROXY
  - SUB-RULE,(AND,((NETWORK,UDP))),sub-rule
  - GEOSITE,youtube,PROXY
  - GEOIP,cn,DIRECT
  - MATCH,auto
```

**规则类型**

以下部分介绍了部分规则类型及其使用方法，Mihomo(ClashMeta)内核的更多详细规则见[虚空终端 WIKI](https://wiki.metacubex.one/config/rules/)

- DOMAIN 域名
```yaml
rules:
  - DOMAIN,www.google.com,policy 
```
域名规则，如果请求的域完全匹配，则会匹配上此规则

- DOMAIN-SUFFIX 域名后缀
```yaml
rules:
  - DOMAIN-SUFFIX,youtube.com,policy 
```
域名后缀规则，如果请求的域名后缀匹配，则会匹配上此规则

例：“google.com”匹配“www.google.com”、“mail.google.com”和“google.com”, 但不匹配“content-google.com”


- DOMAIN-KEYWORD 域名关键词
```yaml
rules:
  - DOMAIN-KEYWORD,google,policy 
```
域名关键词规则，如果请求的域名中包含关键字，则会匹配上此规则


- GEOSITE (CLashMeta专属)

域名集合,匹配集合内的域名,具体参考 [v2fly/domain-list-community](https://github.com/v2fly/domain-list-community/tree/master/data)
```yaml
rules:
  - GEOSITE,google,proxy
  - GEOSITE,cn,DIRECT
```

- GEOIP

国家IP代码规则,匹配集合内相应的IP范围
```yaml
rules:
  - GEOIP,CN,DIRECT
  - GEOIP,LAN,DIRECT
```

- IP-CIDR IPv4地址段

IP-CIDR 规则用于根据数据包的目标 IPv4 地址路由数据包.

>WARNING
>
>使用这种规则时, Clash 将域名解析为 IPv4 地址. 如果要跳过 DNS 解析, 请使用 no-resolve 选项.

```yaml
rules:
  - IP-CIDR,127.0.0.0/8,DIRECT 
```
将任何目标 IP 地址为 127.0.0.0/8 的数据包路由到 DIRECT.

- IP-CIDR6 IPv6地址段

IP-CIDR6 规则用于根据数据包的目标 IPv6 地址路由数据包.

>WARNING
>
>使用这种规则时, Clash 将域名解析为 IPv6 地址. 如果要跳过 DNS 解析, 请使用 no-resolve 选项.
```yaml
rules:
  - IP-CIDR6,2620:0:2d0:200::7/32,policy 
```
将任何目标 IP 地址为 2620:0:2d0:200::7/32 的数据包路由到 policy.


- PROCESS-NAME 源进程名

PROCESS-NAME 规则用于根据发送数据包的进程名称路由数据包.

```yaml
rules:
  - PROCESS-NAME,nc,DIRECT 
```
将任何来自进程 nc 的数据包路由到 DIRECT.

- PROCESS-PATH 源进程路径

PROCESS-PATH 规则用于根据发送数据包的进程路径路由数据包.

```yaml
rules:
  - PROCESS-PATH,/usr/local/bin/nc,DIRECT
```
将任何来自路径为 /usr/local/bin/nc 的进程的数据包路由到 DIRECT.

- RULE-SET 规则集

RULE-SET 规则用于根据 Rule Providers 规则集 的结果路由数据包. 当 Clash 使用此规则时, 它会从指定的 Rule Providers 规则集中加载规则, 然后将数据包与规则进行匹配. 如果数据包与任何规则匹配, 则将数据包路由到指定的策略, 否则跳过此规则.

>WARNING
>
>使用 RULE-SET 时, 当规则集的类型为 IPCIDR , Clash 将解析域名以获取 IP 地址. 如果要跳过 DNS 解析, 请使用 no-resolve 选项.
```yaml
rules:
  - RULE-SET,my-rule-provider,DIRECT 
```
从 my-rule-provider 加载所有规则


- MATCH 全匹配

MATCH 规则用于路由剩余的数据包. 该规则是必需的, 通常用作最后一条规则.
```yaml
rules:
  - MATCH,policy 
```
将上面没有匹配到的请求走该策略

</details>

---

<details>
  <summary>添加规则集</summary>

### 按需添加规则集

规则集添加可以按以下格式进行添加，注意：前面有两个空格，不要使用Tab进行缩进，使用英文`,` ，符号后有空格

由于 规则集 有三种 行为类型(behavior：domain, ipcidr or classical)，和两种 格式(format：yaml or text)，因此有6种不同的组合，需要针对规则集内容来书写不同的参数

- `behavior: classical` `format: yaml`

其规则集内容格式如下：

```yaml
payload:
  - DOMAIN-SUFFIX,google.com
  - DOMAIN-KEYWORD,google
  - DOMAIN,ad.com
  - SRC-IP-CIDR,192.168.1.201/32
  - IP-CIDR,127.0.0.0/8
  - GEOIP,CN
  - DST-PORT,80
  - SRC-PORT,7777
```

在 clash中的书写格式（`format: yaml`可以省略）：

```yaml
rule-providers:
  Apple: {type: http, behavior: classical, interval: 86400, path: ./rule-providers/Apple.yaml, url: https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Apple.yaml}
```


由于在我的配置里写了锚点，用`c: &c {type: http, behavior: classical, interval: 86400}`进行替代，因此也可以写成如下写法，其他的`behavior`也可以进行替代：

```yaml
rule-providers:
  Apple: {<<: *c, interval: 86400, path: ./rule-providers/Apple.yaml, url: https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Apple.yaml}
```

同时需要在`rule`中为其指定策略：
```yaml
rules:
  - RULE-SET,Apple,DIRECT 
```

---

- `behavior: classical` `format: text`

其规则集内容格式如下：

```yaml
DOMAIN-SUFFIX,google.com
DOMAIN-KEYWORD,google
DOMAIN,ad.com
SRC-IP-CIDR,192.168.1.201/32
IP-CIDR,127.0.0.0/8
GEOIP,CN
DST-PORT,80
SRC-PORT,7777
```

在 clash中的书写格式（需要加一个`format: text`）：

```yaml
rule-providers:
  Apple: {type: http, behavior: classical, format: text, interval: 86400, path: ./rule-providers/Apple.yaml, url: https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list}
```



同时需要在`rule`中为其指定策略：
```yaml
rules:
  - RULE-SET,Apple,DIRECT 
```

---

后续仅展示不同`behavior`的区别，具体书写格式和指定策略将省略

- `behavior: domain` `format: yaml`

```yaml
payload:
  - '.blogger.com'
  - '*.*.microsoft.com'
  - 'books.itunes.apple.com'
```

- `behavior: domain` `format: text`

```yaml
.blogger.com
*.*.microsoft.com
books.itunes.apple.com
```

- `behavior: ipcidr` `format: yaml`
```yaml
payload:
  - '192.168.1.0/24'
  - '10.0.0.0.1/32'
```

- `behavior: ipcidr` `format: text`
```yaml
192.168.1.0/24
10.0.0.0.1/32
```
</details>

---

### Clash Verge 在线订阅转换配置
> 在线订阅转换可能出现订阅泄露

#### 1. 打开[ACL4SSR](https://acl4ssr-sub.github.io/) 
#### 2. 填入 **机场订阅** 和 **远程配置**

**_自用 多流媒体分组 自动测速 配置_**
```
https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/Online_Full_Auto.ini
```
**_自用 多流媒体分组 手动选择 配置_**
```
https://raw.githubusercontent.com/Repcz/Tool/X/Clash/Meta/Online_Full_NoAuto.ini
```

#### 3. 选择后端地址并生成订阅
* 强烈建议使用自建后端，自建后端订阅转换可以有效防止订阅泄露以及规则下载不全等问题，具体方法见[自建subconverter订阅转换](https://github.com/Repcz/Tool/tree/X/subconverter)

![4](https://github.com/Repcz/Tool/blob/X/Clash/Meta/Photo/4.PNG)

#### 导入Clash Verge

* 打开Clash Verge，点击左侧 **配置/订阅**，点击右上角**新建**
* 类型选择**Remote**，订阅链接输入转换后的链接
* 选中导入的配置，并点击右键 → **启用/使用**
* 等待右上角提示 **Refresh clash config** 后, 点击左侧 **设置** → 勾选 **系统代理** （左下角托盘里右键图标亦可更改）
* 点击左侧 **代理** ，按需设置对应的分流

---

## Clash for Windows 预处理配置使用方法

> 由于 CFW 所使用的 Clash Premium 内核并不支持解析Base64格式的订阅，因此此处仅展示在本地直接覆盖机场配置的预处理；
> 
> CFW 本地配置请自行在仓库中自行寻找并参考上文所述方法修改对应的参数。

#### 1. 导入订阅后，确保正常链接外网，启动系统代理
![1](https://github.com/Repcz/Tool/blob/X/Clash/Premium/Photo/1.png)

#### 2. 打开CFW 设置——配置——点击预处理右侧的编辑，会弹出一个编辑器
![2](https://github.com/Repcz/Tool/blob/X/Clash/Premium/Photo/2.png)

#### 3. [点击链接](https://github.com/Repcz/Tool/blob/X/Clash/Premium/CFW_parser.yaml)，复制里面的配置，在CFW弹出的编辑器里，替换原有内容，并保存
![3](https://github.com/Repcz/Tool/blob/X/Clash/Premium/Photo/3.png)
![4](https://github.com/Repcz/Tool/blob/X/Clash/Premium/Photo/4.png)

#### 4. 打开CFW 配置，刷新配置，等待下载外部文件

> 如果出现下载失败的错误，多试几次就好

![5](https://github.com/Repcz/Tool/blob/X/Clash/Premium/Photo/5.png)




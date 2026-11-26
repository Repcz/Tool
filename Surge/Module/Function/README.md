# Function

功能性模块集合。

## AWS Lightsail Traffic（LightsailPanel.sgmodule）

在 Surge 面板展示 AWS Lightsail 实例当月流量使用情况，并支持每日流量日报推送。

- 统计口径与 AWS 控制台一致：当月 UTC 自然月，入站/出站双向取大者计费
- 套餐流量配额自动通过 API 获取（本地缓存 24 小时）
- 支持多区域实例，展示实例公网 IP（支持 full/mask/hide）与 IP 反查中文地区（缓存 24 小时）
- 纯脚本实现 SigV4 签名，直连 Lightsail API，无需服务端中转

### IAM 密钥的用途与获取方式

模块需要一对 IAM 访问密钥（AccessKeyId / SecretAccessKey），仅用于调用以下三个只读接口：

| 接口 | 用途 |
|---|---|
| `lightsail:GetInstances` | 列出实例及所在区域 |
| `lightsail:GetBundles` | 读取套餐对应的每月流量配额 |
| `lightsail:GetInstanceMetricData` | 读取实例 NetworkIn / NetworkOut 流量指标 |

该密钥**不含任何写权限**，无法创建、删除或修改任何资源。

获取步骤：

1. 进入 AWS 控制台 → IAM（完整版，非 Lightsail 内嵌页）
2. 「策略」→「创建策略」→ JSON 标签页，粘贴：

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": [
         "lightsail:GetInstances",
         "lightsail:GetBundles",
         "lightsail:GetInstanceMetricData"
       ],
       "Resource": "*"
     }]
   }
   ```

3. 「用户」→ 创建用户（用户名仅限字母数字及 `+ = , . @ _ -`）→ 直接附加上述策略
4. 用户「安全凭证」→ 创建访问密钥 → 将 AccessKeyId / SecretAccessKey 填入模块参数

> 注意：SecretAccessKey 仅在创建时完整显示一次，请妥善保存；密钥泄露请在 IAM 中立即作废。

### 模块参数

| 参数 | 说明 | 默认值 |
|---|---|---|
| `access-key-id` | IAM AccessKeyId（见上方获取方式） | 必填 |
| `secret-access-key` | IAM SecretAccessKey（见上方获取方式） | 必填 |
| `region` | 实例所在区域，多个用英文逗号分隔，例 `ap-northeast-1,us-east-1` | `ap-northeast-1` |
| `icon` | 面板图标名 | `cloud` |
| `icon-color` | 图标颜色 | `FF9900` |
| `ip-mode` | IP 展示方式：`full` 完整 / `mask` 打码 / `hide` 隐藏 | `mask` |
| `daily-notify` | 每日 09:00 推送流量日报 | `true` |

## Peekabo GIGO INFO（PeekaboPanel.sgmodule）

在 Surge 面板展示 Peekabo（GIGO）服务器信息，并支持每日流量日报推送。

### 参数获取方式

1. **Server ID**：进入 [control panel](https://gigo.peekabo.io)，网页链接 `/sever/` 后的内容即为 ID
2. **API Token**：进入 control panel → 点击左上角「Account」→ 点击第二行「API」

### 模块参数

| 参数 | 说明 | 默认值 |
|---|---|---|
| `id` | Server ID（见上方获取方式） | 必填 |
| `token` | API Token（见上方获取方式） | 必填 |
| `icon` | 面板图标名（需已在 Surge 图标库中） | `xserve` |
| `icon-color` | 图标颜色 | `3B82F6` |
| `ip-mode` | IP 展示方式：`full` 完整 / `mask` 打码 / `hide` 隐藏 | `mask` |
| `daily-notify` | 每日 09:00 推送流量日报 | `true` |

## Aliyun ECS CDT Traffic（AliyunEcsPanel.sgmodule）

在 Surge 面板展示阿里云 ECS 当月互联网流量使用情况（CDT 口径），支持每日流量日报推送与阈值自动启停实例。

- 流量统计与阿里云 CDT 控制台一致：`ListCdtInternetTraffic` 明细求和
- 纯脚本实现阿里云 RPC 签名（HMAC-SHA1），直连 CDT / ECS API，无需服务端中转
- `auto-action=true` 时按阈值幂等控制实例：流量低于阈值确保运行，达到阈值确保停止（对应 RAM 权限需包含 `ecs:StartInstances` / `ecs:StopInstances`）
- 展示实例名称、公网 IP（支持 full/mask/hide）、IP 反查中文地区（缓存 24 小时）、实例状态

### RAM 权限与 AccessKey 获取方式

模块需要一对阿里云 AccessKey，最小权限策略示例：

```json
{
  "Version": "1",
  "Statement": [
    { "Effect": "Allow", "Action": ["cdt:ListCdtInternetTraffic"], "Resource": "*" },
    { "Effect": "Allow", "Action": ["ecs:DescribeInstances"], "Resource": "*" },
    { "Effect": "Allow", "Action": ["ecs:StartInstances", "ecs:StopInstances"], "Resource": "*" }
  ]
}
```

> 仅展示用途时，可去掉 `ecs:StartInstances` / `ecs:StopInstances` 两条。

获取步骤：RAM 控制台 → 创建用户 → 附加上述自定义策略 → 创建 AccessKey，将 AccessKeyId / AccessKeySecret 填入模块参数。

### 模块参数

| 参数 | 说明 | 默认值 |
|---|---|---|
| `access-key-id` | 阿里云 AccessKeyId（见上方获取方式） | 必填 |
| `secret-access-key` | 阿里云 AccessKeySecret（见上方获取方式） | 必填 |
| `region` | 实例所在区域 ID，例 `cn-hongkong` | `cn-hongkong` |
| `instance-id` | ECS 实例 ID，例 `i-bp1xxxxxxxxxxxxx` | 必填 |
| `quota` | 当月互联网流量配额（GB），用于计算百分比 | `200` |
| `threshold` | 流量阈值（GB），达到后停止实例 | `180` |
| `auto-action` | 是否允许脚本自动启停实例 | `false` |
| `icon` | 面板图标名 | `cloud` |
| `icon-color` | 图标颜色 | `FF6A00` |
| `ip-mode` | IP 展示方式：`full` 完整 / `mask` 打码 / `hide` 隐藏 | `mask` |
| `daily-notify` | 每日 09:00 推送流量日报 | `true` |

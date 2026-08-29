<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=28&duration=3000&pause=1000&color=3178C6&center=true&vCenter=true&multiline=true&repeat=true&width=620&height=80&lines=%F0%9F%9B%A0%EF%B8%8F+Tool+%E2%80%94+%E4%BB%A3%E7%90%86%E8%A7%84%E5%88%99%E4%BB%93%E5%BA%93;%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA+%C2%B7+%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0+%C2%B7+%E5%A4%9A%E5%B9%B3%E5%8F%B0%E6%94%AF%E6%8C%81" alt="Tool — 代理规则仓库 | 自动化构建 · 持续更新 · 多平台支持" />

[![](https://visitor-badge.laobi.icu/badge?page_id=Repcz.Tool&left_color=gray&right_color=blue)](#)
[![](https://img.shields.io/github/stars/Repcz/Tool?style=flat&label=Stars&color=ffcb2e&logo=github)](https://github.com/Repcz/Tool/stargazers)
[![](https://img.shields.io/github/forks/Repcz/Tool?style=flat&label=Forks&color=2ea043&logo=github)](https://github.com/Repcz/Tool/forks)
[![](https://img.shields.io/badge/License-MIT-22c55e?style=flat&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![](https://img.shields.io/github/last-commit/Repcz/Tool?style=flat&label=Updated&color=3178c6&logo=githubactions&logoColor=white)](https://github.com/Repcz/Tool/commits)
[![](https://img.shields.io/github/commit-activity/m/Repcz/Tool?style=flat&label=Activity&color=ff69b4)](https://github.com/Repcz/Tool/commits)

</div>

---

> [!Caution]
> **禁止任何形式的转载或发布至国内平台**

> [!IMPORTANT]
> 任何以任何方式查看此项目的人或直接或间接使用该项目的使用者都应仔细阅读此声明。
>
> 保留随时更改或补充此免责声明的权利。
>
> 一旦使用并复制了该项目的任何文件，则视为您已接受此免责声明。

---

### 规则集引用方式

各平台通过 `RULE-SET` / `rule-providers` 引用远程规则集：

```ini
# Surge 示例
RULE-SET,https://github.com/Repcz/Tool/raw/X/Surge/Rules/Netflix.list,国际媒体
```

```yaml
# mihomo / Stash 示例
rule-providers:
  Netflix:
    type: http
    behavior: classical
    format: text
    url: https://github.com/Repcz/Tool/raw/X/mihomo/Rules/Netflix.list
    interval: 86400
```

```yaml
# Egern 示例
rules:
  - rule_set:
      match: https://github.com/Repcz/Tool/raw/X/Egern/Rules/Netflix.yaml
    policy: 国际媒体
```

```json
// sing-box 示例
{
  "rule_set": [
    {
      "tag": "netflix",
      "type": "remote",
      "format": "source",
      "url": "https://github.com/Repcz/Tool/raw/X/sing-box/Rules/Netflix.srs"
    }
  ]
}
```

自 `sing-box 1.14.0-alpha.46` 起: `tag` 也接受一组标签，用于一次定义多个共享其他选项的规则集。

```json
// sing-box 多 tag 示例
{
  "rule_set": [
      {
          "tag": [
              "Reject",
              "AI", "Telegram", "Twitter", "Facebook", "TikTok",
              "Steam", "Epic",
              "Google", "Microsoft", "Github",
              "Emby", 
              "Spotify", "Bahamut", "Netflix", "Disney", "PrimeVideo", "HBO", 
              "Proxy", "AppleProxy", 
              "ChinaDomain", "ChinaIP"
          ],
          "type": "remote", "format": "binary",
          "url": "https://github.com/Repcz/Tool/raw/X/sing-box/Rules/{tag}.srs"
      }
  ]
}
```

> 所有规则集均从 `X` 分支提供，通过 `raw` 或 `raw.githubusercontent.com` 直接引用。

---

## 📝 更新日志

变更记录由 CI 自动提交，格式为 `update(rules): YYYY-MM-DD HH:mm:ss`。

---

## ⚖️ 免责申明

- 本项目涉及的脚本仅用于资源共享和学习研究，不能保证其合法性、准确性、完整性和有效性，请根据情况自行判断。
- 间接使用该项目的任何用户，包括但不限于建立 VPS 或在某些行为违反国家/地区法律或相关法规的情况下进行传播，本项目对于由此引起的任何隐私泄漏或其他后果概不负责。
- 请勿将本项目的任何内容用于商业或非法目的，否则后果自负。
- 如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，则应及时通知并提供身份证明、所有权证明，我们将在收到认证文件后删除相关脚本。
- 对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害。
- 您必须在下载后的 24 小时内从计算机或手机中完全删除以上内容。

---

<div align="center">

<img src="https://img.shields.io/badge/%E4%BB%85%E7%94%A8%E4%BA%8E%E5%AD%A6%E4%B9%A0%E5%92%8C%E7%A0%94%E7%A9%B6%E7%9B%AE%E7%9A%84-3178C6?style=flat-square" alt="仅用于学习和研究目的" />

</div>

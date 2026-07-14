# SportX

**Plan global football and basketball schedules in one responsive dashboard.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0969da?logo=github)](https://git-hpw.github.io/sportx-oss-clean/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![No build step](https://img.shields.io/badge/build-none-2ea44f)](#quick-start)

[**Live demo**](https://git-hpw.github.io/sportx-oss-clean/) · [Report a bug](https://github.com/GIT-HPW/sportx-oss-clean/issues) · [Request a feature](https://github.com/GIT-HPW/sportx-oss-clean/issues)

![SportX sports schedule dashboard preview](assets/sportx-focus-board.svg)

SportX is a static sports schedule dashboard for tracking global football and basketball events, followed players, calendar planning, and lightweight match prediction. It runs directly in the browser with no framework, package installation, or build step.

> **Project status:** `v0.1.0-alpha`. SportX is an independent prototype, not a production service. Interfaces and upstream data availability may change.

This repository is the open-source clean edition. It does not include third-party player photos or proprietary media assets.

## Features

- Real match schedule loading from ESPN scoreboard JSON.
- Football and basketball filtering.
- Competition, region, team, and player search.
- Chinese search aliases, such as `世界杯`, `欧冠`, `英超`, `NBA`, `哈兰德`, `亚马尔`.
- Player watchlist with initials-based avatars.
- Player-related schedule filtering.
- Seven-day calendar view and match list view.
- Lightweight win probability estimate for planning reference.
- High-tech animated background and responsive layout.

## 功能说明

SportX 当前是一个无需注册、无需安装客户端的静态赛事规划原型。访问者可直接通过 [在线演示](https://git-hpw.github.io/sportx-oss-clean/) 使用以下功能。

### 1. 真实赛程聚合

- 页面启动时从 ESPN scoreboard JSON 接口请求足球和篮球赛程。
- 将不同赛事源整理为统一的比赛卡片，并按访问者本地时区显示时间。
- 顶部概览展示今日比赛、本周重点、球星相关和青年赛事数量。
- 支持手动刷新；某个数据源失败时，页面会保留其他成功返回的数据。

### 2. 搜索与组合筛选

- 可按赛事、球队和球星关键词即时搜索。
- 内置部分中英文别名，例如 `世界杯`、`欧冠`、`英超`、`NBA`、`哈兰德`、`亚马尔`。
- 可组合筛选足球/篮球、俱乐部/国家队/青训以及欧洲/亚洲/美洲/全球等条件。
- 提供“重点比赛”“球星赛程”和一键重置筛选入口。

### 3. 日历与比赛列表

- 七日赛程视图按日期组织比赛，便于快速查看未来一周安排。
- 可切换为紧凑列表视图，并在重点列表中查看更完整的赛事信息。
- 页面会分析时间接近的重点比赛，并提示可能发生的观赛时间冲突。
- 日历导出按钮目前为预留入口，尚未生成 `.ics` 文件。

### 4. 球星追踪与关注

- 球星卡片展示所属球队、相关赛程数量和状态提示。
- 点击球星可立即筛选其相关比赛；未提供授权照片时使用姓名首字母头像。
- “我的关注”支持在当前页面会话中选择或取消球队、国家队及赛事标签。
- 当前版本没有账户和云同步，关注选择在刷新页面后不会持久保存。

### 5. 轻量比赛预测

- 数据源提供赔率时，将美式赔率转换并归一化为主胜、平局和客胜概率。
- 没有赔率时，使用主客场背景与有限的状态线索生成启发式估计。
- 比赛卡片同时显示概率、领先方和估计信心等级。
- 所有预测仅用于赛程规划和界面演示，不构成投注、财务或结果保证。

### 6. 响应式界面与主题

- 桌面端采用侧边导航和多栏仪表盘，移动端自动调整为紧凑布局。
- 提供白色、黑色、深蓝和科幻四种主题。
- 主题选择保存在浏览器 `localStorage` 中，重新访问时会自动恢复。
- 项目使用原生 HTML、CSS 和 JavaScript，无框架依赖、无构建步骤。

## Quick Start

This is a static prototype. No build step is required.

Serve the repository with a local static server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

You can also explore the hosted version at **https://git-hpw.github.io/sportx-oss-clean/**.

Opening `index.html` directly may work, but some browsers restrict runtime network requests from `file://` pages. See [MOBILE_QUICK_START.md](MOBILE_QUICK_START.md) for phone testing on a trusted local network.

## Data Source

The prototype currently requests ESPN scoreboard JSON at runtime:

```text
https://site.api.espn.com/apis/site/v2/sports/.../scoreboard
```

This project is not affiliated with ESPN, Disney, FIFA, UEFA, NBA, WNBA, Bundesliga, or any club, league, player, federation, or broadcaster.

The ESPN endpoint is used as an unofficial public data source for prototyping. It may change, rate-limit, return incomplete data, or become unavailable.

Public accessibility of an endpoint does not grant rights to its data. Anyone deploying or commercializing a modified version is responsible for reviewing the provider's current terms and obtaining any required permission. The MIT License covers this repository's original code and documentation only; it does not license third-party data, names, trademarks, or media.

## Player Images

The clean open-source edition intentionally does not ship third-party player headshots.

By default, player cards use initials. For private/local use, you may add your own images and set `photoUrl` fields in `app.js`, or create your own local player-photo mapping. Do not redistribute images unless you have the right license and attribution for each file.

## Match Prediction

The win probability display is for schedule-planning reference only.

- If odds data is available from the runtime data source, SportX derives normalized implied probabilities.
- If odds data is not available, SportX uses a simple heuristic based on home/away context and form hints.
- Predictions are not official, not guaranteed, and not betting or financial advice.

## Project Structure

```text
sportx-oss-clean/
  index.html
  styles.css
  app.js
  assets/
    sportx-focus-board.svg
  sportx-project-design.md
  README.md
  CONTRIBUTING.md
  SECURITY.md
  CHANGELOG.md
  DISCLAIMER.md
  LICENSE
```

## Current Limitations

- No account system, cloud sync, backend, or guaranteed persistent data.
- Schedule coverage depends on the unofficial runtime data source and may be incomplete.
- Upstream CORS rules, rate limits, or response formats may change without notice.
- Player availability and match predictions are approximate and may be unavailable.
- Some concepts in `sportx-project-design.md` describe future work rather than completed functionality.

## Open Source Notes

This clean edition is intended to be safe to publish as code. Before publishing a modified version, check that you have not added:

- Third-party player photos without license and attribution.
- League, club, or broadcaster logos copied from official sites.
- Scraped content that violates a website's terms.
- Claims of official affiliation or endorsement.

## License

MIT License. See [LICENSE](LICENSE).

See [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes and [SECURITY.md](SECURITY.md) for vulnerability reports.

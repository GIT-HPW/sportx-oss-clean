# SportX

SportX is a static sports schedule dashboard for tracking global football and basketball events, followed players, calendar planning, and lightweight match prediction.

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

## Run Locally

This is a static prototype. No build step is required.

Serve the repository with a local static server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

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

MIT License. See `LICENSE`.

See [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes and [SECURITY.md](SECURITY.md) for vulnerability reports.

const DATA_SOURCES = [
  {
    key: "fifa-world",
    label: "FIFA World Cup",
    sport: "football",
    type: "national",
    region: "Global",
    path: "soccer/fifa.world",
    searchAliases: ["世界杯", "男足世界杯", "FIFA 世界杯", "World Cup"],
    major: true,
  },
  {
    key: "uefa-champions",
    label: "UEFA Champions League",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/uefa.champions",
    searchAliases: ["欧冠", "欧洲冠军联赛", "冠军联赛", "UEFA Champions League"],
    major: true,
  },
  {
    key: "premier-league",
    label: "Premier League",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/eng.1",
    searchAliases: ["英超", "英格兰超级联赛", "Premier League"],
  },
  {
    key: "la-liga",
    label: "LaLiga",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/esp.1",
    searchAliases: ["西甲", "西班牙甲级联赛", "LaLiga"],
  },
  {
    key: "serie-a",
    label: "Serie A",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/ita.1",
    searchAliases: ["意甲", "意大利甲级联赛", "Serie A"],
  },
  {
    key: "bundesliga",
    label: "Bundesliga",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/ger.1",
    searchAliases: ["德甲", "德国甲级联赛", "Bundesliga"],
  },
  {
    key: "ligue-1",
    label: "Ligue 1",
    sport: "football",
    type: "club",
    region: "Europe",
    path: "soccer/fra.1",
    searchAliases: ["法甲", "法国甲级联赛", "Ligue 1"],
  },
  {
    key: "nba",
    label: "NBA",
    sport: "basketball",
    type: "club",
    region: "Americas",
    path: "basketball/nba",
    searchAliases: ["NBA", "美职篮", "美国职业篮球"],
    major: true,
  },
  {
    key: "wnba",
    label: "WNBA",
    sport: "basketball",
    type: "club",
    region: "Americas",
    path: "basketball/wnba",
    searchAliases: ["WNBA", "女篮", "美国女子篮球"],
  },
];

const STAR_WATCHLIST = [
  {
    name: "Erling Haaland",
    sport: "football",
    team: "Norway / Manchester City",
    teamAliases: ["Norway", "Manchester City"],
    searchAliases: ["Haaland", "哈兰德", "埃尔林 哈兰德"],
    status: "watchlist",
    initials: "EH",
  },
  {
    name: "Lamine Yamal",
    sport: "football",
    team: "Spain / Barcelona",
    teamAliases: ["Spain", "Barcelona"],
    searchAliases: ["Yamal", "亚马尔", "拉明 亚马尔"],
    status: "watchlist",
    initials: "LY",
  },
  {
    name: "Kylian Mbappe",
    sport: "football",
    team: "France / Real Madrid",
    teamAliases: ["France", "Real Madrid"],
    searchAliases: ["Mbappe", "姆巴佩", "基利安 姆巴佩"],
    status: "watchlist",
    initials: "KM",
  },
  {
    name: "Lionel Messi",
    sport: "football",
    team: "Argentina / Inter Miami",
    teamAliases: ["Argentina", "Inter Miami"],
    searchAliases: ["Messi", "梅西"],
    status: "watchlist",
    initials: "LM",
  },
  {
    name: "Jude Bellingham",
    sport: "football",
    team: "England / Real Madrid",
    teamAliases: ["England", "Real Madrid"],
    searchAliases: ["Bellingham", "贝林厄姆"],
    status: "watchlist",
    initials: "JB",
  },
  {
    name: "Vinicius Junior",
    sport: "football",
    team: "Brazil / Real Madrid",
    teamAliases: ["Brazil", "Real Madrid"],
    searchAliases: ["Vinicius", "维尼修斯"],
    status: "watchlist",
    initials: "VJ",
  },
  {
    name: "Luka Doncic",
    sport: "basketball",
    team: "Slovenia / Dallas Mavericks",
    teamAliases: ["Slovenia", "Dallas Mavericks"],
    searchAliases: ["Doncic", "东契奇"],
    status: "watchlist",
    initials: "LD",
  },
  {
    name: "LeBron James",
    sport: "basketball",
    team: "Los Angeles Lakers",
    teamAliases: ["Los Angeles Lakers", "Lakers"],
    searchAliases: ["LeBron", "James", "詹姆斯", "勒布朗"],
    status: "watchlist",
    initials: "LJ",
  },
  {
    name: "Stephen Curry",
    sport: "basketball",
    team: "Golden State Warriors",
    teamAliases: ["Golden State Warriors", "Warriors"],
    searchAliases: ["Curry", "库里"],
    status: "watchlist",
    initials: "SC",
  },
  {
    name: "A'ja Wilson",
    sport: "basketball",
    team: "Las Vegas Aces",
    teamAliases: ["Las Vegas Aces", "Aces"],
    searchAliases: ["Wilson", "威尔逊"],
    status: "watchlist",
    initials: "AW",
  },
];

const ESPN_BASE_URL = "https://site.api.espn.com/apis/site/v2/sports";
const RANGE_DAYS = 30;

let matches = [];
let players = [];

const state = {
  sport: "all",
  type: "all",
  region: "all",
  search: "",
  view: "calendar",
  playerFocus: false,
  selectedPlayer: "",
  importantFocus: false,
  isLoading: true,
  loadedSources: 0,
  failedSources: 0,
  lastUpdated: null,
};

const formatter = new Intl.DateTimeFormat("zh-CN", {
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const matchList = document.querySelector("#matchList");
const calendarGrid = document.querySelector("#calendarGrid");
const playerList = document.querySelector("#playerList");
const conflictList = document.querySelector("#conflictList");
const toast = document.querySelector("#toast");
const dataNote = document.querySelector("#dataNote");
const themeSelect = document.querySelector("#themeSelect");

const THEME_LABELS = {
  light: "白色",
  dark: "黑色",
  deepblue: "深蓝",
  scifi: "科幻",
};

function getValidTheme(theme) {
  return Object.prototype.hasOwnProperty.call(THEME_LABELS, theme) ? theme : "light";
}

function applyTheme(theme) {
  const nextTheme = getValidTheme(theme);
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("sportx-theme", nextTheme);

  if (themeSelect) {
    themeSelect.value = nextTheme;
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character];
  });
}

function getStartOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function toEspnDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}${month}${day}`;
}

function getDateRange() {
  const start = getStartOfToday();
  const end = addDays(start, RANGE_DAYS);
  return `${toEspnDate(start)}-${toEspnDate(end)}`;
}

async function fetchSource(source) {
  const url = `${ESPN_BASE_URL}/${source.path}/scoreboard?dates=${getDateRange()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${source.label} returned ${response.status}`);
  }

  const payload = await response.json();
  const events = Array.isArray(payload.events) ? payload.events : [];
  return events.map((event) => adaptEspnEvent(event, source)).filter(Boolean);
}

function adaptEspnEvent(event, source) {
  const competition = event.competitions?.[0];
  const competitors = Array.isArray(competition?.competitors) ? competition.competitors : [];

  if (!competition || competitors.length < 2) {
    return null;
  }

  const home = competitors.find((competitor) => competitor.homeAway === "home") || competitors[0];
  const away = competitors.find((competitor) => competitor.homeAway === "away") || competitors[1];
  const homeName = home?.team?.displayName || home?.team?.name || "Home";
  const awayName = away?.team?.displayName || away?.team?.name || "Away";
  const start = competition.startDate || competition.date || event.date;
  const status = competition.status?.type?.description || event.status?.type?.description || "Scheduled";
  const stage = competition.altGameNote || event.season?.slug || competition.status?.type?.shortDetail || source.label;
  const venue = formatVenue(competition);
  const playerRefs = extractPlayerRefs(competitors, source.sport);
  const sourceUrl = event.links?.find((link) => link.rel?.includes("summary"))?.href || "";

  return {
    id: `${source.key}-${event.id}`,
    sport: source.sport,
    type: source.type,
    region: source.region,
    competition: source.label,
    home: homeName,
    away: awayName,
    start,
    stage,
    venue,
    status,
    prediction: buildPrediction(source, competition, home, away),
    important: isImportantMatch(source, stage),
    youth: source.type === "youth",
    searchAliases: source.searchAliases || [],
    players: playerRefs.map((player) => player.name),
    playerRefs,
    sourceName: "ESPN",
    sourceUrl,
  };
}

function formatVenue(competition) {
  const venueName = competition.venue?.fullName || competition.venue?.displayName || "";
  const city = competition.venue?.address?.city || "";
  const country = competition.venue?.address?.country || "";
  return [venueName, city, country].filter(Boolean).join(" · ") || "Venue TBA";
}

function buildPrediction(source, competition, home, away) {
  const oddsPrediction = buildOddsPrediction(source, competition);

  if (oddsPrediction) {
    return oddsPrediction;
  }

  return buildHeuristicPrediction(source, home, away);
}

function buildOddsPrediction(source, competition) {
  const odds = Array.isArray(competition.odds) ? competition.odds.find(Boolean) : null;
  const moneyline = odds?.moneyline;

  if (!moneyline?.home?.close?.odds || !moneyline?.away?.close?.odds) {
    return null;
  }

  const home = americanOddsToProbability(moneyline.home.close.odds);
  const away = americanOddsToProbability(moneyline.away.close.odds);
  const draw = source.sport === "football" && moneyline.draw?.close?.odds ? americanOddsToProbability(moneyline.draw.close.odds) : 0;
  const normalized = normalizeProbabilities({ home, draw, away });

  return {
    ...normalized,
    source: "赔率隐含",
    confidence: getPredictionConfidence(normalized),
  };
}

function buildHeuristicPrediction(source, home, away) {
  const homeForm = getFormScore(home.form);
  const awayForm = getFormScore(away.form);
  const formDiff = Math.max(-0.12, Math.min(0.12, (homeForm - awayForm) * 0.04));

  if (source.sport === "football") {
    return finalizeHeuristic({
      home: 0.43 + formDiff,
      draw: 0.25 - Math.abs(formDiff) * 0.4,
      away: 0.32 - formDiff,
    });
  }

  return finalizeHeuristic({
    home: 0.55 + formDiff,
    draw: 0,
    away: 0.45 - formDiff,
  });
}

function finalizeHeuristic(probabilities) {
  const normalized = normalizeProbabilities(probabilities);
  return {
    ...normalized,
    source: "原型模型",
    confidence: getPredictionConfidence(normalized),
  };
}

function americanOddsToProbability(oddsValue) {
  const odds = Number(oddsValue);

  if (!Number.isFinite(odds) || odds === 0) {
    return 0;
  }

  return odds < 0 ? Math.abs(odds) / (Math.abs(odds) + 100) : 100 / (odds + 100);
}

function normalizeProbabilities(probabilities) {
  const total = probabilities.home + probabilities.draw + probabilities.away || 1;
  const home = Math.round((probabilities.home / total) * 100);
  const draw = Math.round((probabilities.draw / total) * 100);
  const away = Math.max(0, 100 - home - draw);

  return { home, draw, away };
}

function getFormScore(form) {
  if (!form) {
    return 0;
  }

  return String(form)
    .slice(-5)
    .split("")
    .reduce((score, result) => {
      if (result === "W") {
        return score + 1;
      }

      if (result === "D") {
        return score + 0.35;
      }

      if (result === "L") {
        return score - 0.7;
      }

      return score;
    }, 0);
}

function getPredictionConfidence(prediction) {
  const top = Math.max(prediction.home, prediction.draw, prediction.away);

  if (top >= 58) {
    return "高";
  }

  if (top >= 46) {
    return "中";
  }

  return "低";
}

function extractPlayerRefs(competitors, sport) {
  const refs = new Map();

  competitors.forEach((competitor) => {
    const teamName = competitor.team?.displayName || competitor.team?.name || "";
    const leaders = Array.isArray(competitor.leaders) ? competitor.leaders : [];

    leaders.forEach((leaderGroup) => {
      const leadersList = Array.isArray(leaderGroup.leaders) ? leaderGroup.leaders : [];

      leadersList.forEach((leader) => {
        const athlete = leader.athlete;
        const name = athlete?.displayName || athlete?.fullName;

        if (!name || refs.has(name)) {
          return;
        }

        refs.set(name, {
          name,
          team: teamName,
          sport,
          status: athlete.active === false ? "uncertain" : "active",
          photoUrl: "",
        });
      });
    });
  });

  return Array.from(refs.values());
}

function isImportantMatch(source, stage) {
  const normalized = `${source.label} ${stage}`.toLowerCase();
  const importantWords = ["world cup", "champions league", "final", "semifinal", "semi-final", "quarterfinal", "quarter-final", "playoff"];
  return Boolean(source.major && importantWords.some((word) => normalized.includes(word)));
}

function dedupeMatches(rawMatches) {
  const byId = new Map();

  rawMatches.forEach((match) => {
    if (!byId.has(match.id)) {
      byId.set(match.id, match);
    }
  });

  return Array.from(byId.values()).sort((a, b) => new Date(a.start) - new Date(b.start));
}

function normalizeName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findWatchlistPlayersForMatch(match) {
  const home = normalizeName(match.home);
  const away = normalizeName(match.away);

  return STAR_WATCHLIST.filter((star) => {
    if (star.sport !== match.sport) {
      return false;
    }

    return star.teamAliases.some((alias) => {
      const normalizedAlias = normalizeName(alias);
      return normalizedAlias && (home === normalizedAlias || away === normalizedAlias || home.includes(normalizedAlias) || away.includes(normalizedAlias));
    });
  });
}

function attachWatchlistPlayers(nextMatches) {
  return nextMatches.map((match) => {
    const existingNames = new Set(match.playerRefs.map((player) => player.name));
    const watchlistRefs = findWatchlistPlayersForMatch(match)
      .filter((star) => !existingNames.has(star.name))
      .map((star) => ({
        name: star.name,
        team: star.team,
        sport: star.sport,
        status: star.status,
        relation: "team-related",
        watchlisted: true,
        aliases: star.searchAliases || [],
        photoUrl: star.photoUrl || "",
      }));

    const playerRefs = [...match.playerRefs, ...watchlistRefs];

    return {
      ...match,
      playerRefs,
      players: playerRefs.map((player) => player.name),
    };
  });
}

function derivePlayersFromMatches(nextMatches) {
  const byName = new Map();

  STAR_WATCHLIST.forEach((star) => {
    byName.set(normalizeName(star.name), {
      name: star.name,
      sport: star.sport,
      team: star.team,
      teams: new Set(star.team ? [star.team] : []),
      status: star.status,
      matchIds: new Set(),
      initials: star.initials || getInitials(star.name),
      watchlisted: true,
      aliases: star.searchAliases || [],
      photoUrl: star.photoUrl || "",
    });
  });

  nextMatches.forEach((match) => {
    match.playerRefs.forEach((player) => {
      const playerKey = normalizeName(player.name);
      const existing = byName.get(playerKey) || {
        name: player.name,
        sport: player.sport,
        teams: new Set(),
        status: player.status,
        initials: getInitials(player.name),
        matchIds: new Set(),
        watchlisted: Boolean(player.watchlisted),
        aliases: player.aliases || [],
        photoUrl: player.photoUrl || "",
      };

      if (player.team) {
        existing.teams.add(player.team);
      }

      if (player.aliases?.length) {
        existing.aliases = Array.from(new Set([...(existing.aliases || []), ...player.aliases]));
      }

      if (existing.name !== player.name) {
        existing.aliases = Array.from(new Set([...(existing.aliases || []), player.name]));
      }

      if (!existing.photoUrl && player.photoUrl) {
        existing.photoUrl = player.photoUrl;
      }

      existing.matchIds.add(match.id);
      existing.watchlisted = existing.watchlisted || Boolean(player.watchlisted);
      byName.set(playerKey, existing);
    });
  });

  return Array.from(byName.values())
    .sort((a, b) => {
      const watchlistDiff = Number(b.watchlisted) - Number(a.watchlisted);
      if (watchlistDiff !== 0) {
        return watchlistDiff;
      }

      return b.matchIds.size - a.matchIds.size || a.name.localeCompare(b.name);
    })
    .map((player) => ({
      ...player,
      count: player.matchIds.size,
      team: player.team || Array.from(player.teams).slice(0, 2).join(" / ") || "Team TBA",
    }));
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

async function loadRealData() {
  state.isLoading = true;
  updateDataNote();
  renderAll();

  const results = await Promise.allSettled(DATA_SOURCES.map(fetchSource));
  const fulfilled = results.filter((result) => result.status === "fulfilled");
  const rejected = results.filter((result) => result.status === "rejected");

  matches = attachWatchlistPlayers(dedupeMatches(fulfilled.flatMap((result) => result.value)));
  players = derivePlayersFromMatches(matches);
  state.loadedSources = fulfilled.length;
  state.failedSources = rejected.length;
  state.lastUpdated = new Date();
  state.isLoading = false;

  updateDataNote();
  renderAll();

  if (rejected.length > 0) {
    showToast(`有 ${rejected.length} 个数据源暂时不可用`);
  }
}

function updateDataNote() {
  if (!dataNote) {
    return;
  }

  if (state.isLoading) {
    dataNote.textContent = "正在连接 ESPN 真实赛程数据...";
    return;
  }

  const updatedAt = state.lastUpdated ? timeFormatter.format(state.lastUpdated) : "--:--";
  dataNote.textContent =
    matches.length > 0
      ? `真实数据：ESPN scoreboard · ${updatedAt} 更新 · ${state.loadedSources}/${DATA_SOURCES.length} 个源可用 · ${matches.length} 场`
      : `已连接 ESPN，但未来 ${RANGE_DAYS} 天当前数据源暂无比赛；${state.loadedSources}/${DATA_SOURCES.length} 个源可用`;
}

function getFilteredMatches() {
  const query = state.search.trim().toLowerCase();
  const trackedPlayers = new Set(players.map((player) => player.name));

  return matches.filter((match) => {
    const haystack = [
      match.competition,
      match.home,
      match.away,
      match.region,
      match.stage,
      match.venue,
      match.status,
      getSportLabel(match.sport),
      getTypeLabel(match.type),
      getRegionLabel(match.region),
      ...(match.searchAliases || []),
      ...match.players,
      ...match.playerRefs.flatMap((player) => player.aliases || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = query.length === 0 || haystack.includes(query);
    const matchesSport = state.sport === "all" || match.sport === state.sport;
    const matchesType = state.type === "all" || match.type === state.type;
    const matchesRegion = state.region === "all" || match.region === state.region;
    const matchesPlayerFocus = !state.playerFocus || match.players.some((player) => trackedPlayers.has(player));
    const matchesSelectedPlayer = !state.selectedPlayer || matchIncludesPlayer(match, state.selectedPlayer);
    const matchesImportant = !state.importantFocus || match.important;

    return matchesQuery && matchesSport && matchesType && matchesRegion && matchesPlayerFocus && matchesSelectedPlayer && matchesImportant;
  });
}

function matchIncludesPlayer(match, playerName) {
  return match.playerRefs.some((player) => player.name === playerName);
}

function getFilteredPlayers() {
  const query = state.search.trim().toLowerCase();
  const queryMatchesAnyPlayer =
    query.length > 0 &&
    players.some((player) => {
      const haystack = [player.name, player.team, player.sport, player.status, ...(player.aliases || [])].join(" ").toLowerCase();
      return haystack.includes(query);
    });

  return players.filter((player) => {
    const haystack = [player.name, player.team, player.sport, player.status, ...(player.aliases || [])].join(" ").toLowerCase();
    const matchesQuery = !queryMatchesAnyPlayer || haystack.includes(query);
    const matchesSport = state.sport === "all" || player.sport === state.sport;
    return matchesQuery && matchesSport;
  });
}

function getSportLabel(sport) {
  return sport === "football" ? "足球" : "篮球";
}

function getTypeLabel(type) {
  const labels = {
    club: "俱乐部",
    national: "国家队",
    youth: "青训",
  };
  return labels[type] || type;
}

function getRegionLabel(region) {
  const labels = {
    Europe: "欧洲",
    Asia: "亚洲",
    Americas: "美洲",
    Global: "全球",
  };
  return labels[region] || region;
}

function formatDate(date) {
  return formatter.format(date).replace(/\//g, ".");
}

function renderMetrics() {
  const todayKey = dayKeyFormatter.format(new Date());
  const todayMatches = matches.filter((match) => dayKeyFormatter.format(new Date(match.start)) === todayKey);
  document.querySelector("#todayCount").textContent = todayMatches.length;
  document.querySelector("#importantCount").textContent = matches.filter((match) => match.important).length;
  document.querySelector("#playerCount").textContent = matches.filter((match) => match.players.length > 0).length;
  document.querySelector("#youthCount").textContent = matches.filter((match) => match.youth).length;
}

function createTags(match) {
  const tags = [
    `<span class="tag ${escapeHtml(match.sport)}">${getSportLabel(match.sport)}</span>`,
    `<span class="tag">${getTypeLabel(match.type)}</span>`,
    `<span class="tag status">${escapeHtml(match.status)}</span>`,
    `<span class="tag source">${escapeHtml(match.sourceName)}</span>`,
  ];

  if (match.youth) {
    tags.push('<span class="tag youth">青年赛事</span>');
  }

  if (match.important) {
    tags.push('<span class="tag important">关键</span>');
  }

  if (match.playerRefs.some((player) => player.watchlisted)) {
    tags.push('<span class="tag star">球星相关</span>');
  }

  return tags.join("");
}

function renderMatchList() {
  const filtered = getFilteredMatches();

  if (state.isLoading) {
    matchList.innerHTML = '<div class="empty-state">正在加载真实赛程数据...</div>';
    return;
  }

  if (filtered.length === 0) {
    matchList.innerHTML = '<div class="empty-state">当前筛选或日期范围内没有比赛</div>';
    return;
  }

  matchList.innerHTML = filtered
    .map((match) => {
      const start = new Date(match.start);
      const sourceAction = match.sourceUrl
        ? `
            <a class="icon-button" href="${escapeHtml(match.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="打开 ESPN 来源">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" /></svg>
            </a>
          `
        : "";

      return `
        <article class="match-card">
          <div class="time-block">
            <strong>${timeFormatter.format(start)}</strong>
            <span>${formatDate(start)}</span>
          </div>
          <div class="match-main">
            <h3 class="match-title">${escapeHtml(match.home)} vs ${escapeHtml(match.away)}</h3>
            <div class="match-meta">
              <span>${escapeHtml(match.competition)}</span>
              <span>${escapeHtml(match.stage)}</span>
              <span>${escapeHtml(match.venue)}</span>
            </div>
            <div class="tag-row">${createTags(match)}</div>
            ${renderPrediction(match)}
          </div>
          <div class="match-actions">
            <button class="icon-button" type="button" aria-label="收藏 ${escapeHtml(match.home)} vs ${escapeHtml(match.away)}" data-toast="已加入关注">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 17.27 5.18 3.05-1.37-5.83 4.52-3.93-5.96-.51L12 4.55 9.63 10.05l-5.96.51 4.52 3.93-1.37 5.83L12 17.27Z" /></svg>
            </button>
            <button class="icon-button" type="button" aria-label="提醒 ${escapeHtml(match.home)} vs ${escapeHtml(match.away)}" data-toast="已设置赛前提醒">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5-6.71V3a2 2 0 0 0-4 0v1.29A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z" /></svg>
            </button>
            ${sourceAction}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCalendar() {
  const filtered = getFilteredMatches();
  const firstDate = getStartOfToday();
  const days = Array.from({ length: 7 }, (_, index) => addDays(firstDate, index));

  if (state.view === "list") {
    calendarGrid.classList.add("as-list");
    calendarGrid.innerHTML =
      state.isLoading || filtered.length === 0
        ? `<div class="empty-state">${state.isLoading ? "正在加载真实赛程数据..." : "当前筛选或日期范围内没有比赛"}</div>`
        : filtered
            .map((match) => {
              const start = new Date(match.start);
              return `
                <div class="day-column">
                  <div class="mini-match ${escapeHtml(match.sport)} ${match.youth ? "youth" : ""} ${match.important ? "important" : ""}">
                    <span class="mini-time">${formatDate(start)} ${timeFormatter.format(start)}</span>
                    <span class="mini-title">${escapeHtml(match.home)} vs ${escapeHtml(match.away)}</span>
                    <span class="mini-competition">${escapeHtml(match.competition)}</span>
                    ${renderMiniPrediction(match)}
                  </div>
                </div>
              `;
            })
            .join("");
    return;
  }

  calendarGrid.classList.remove("as-list");
  calendarGrid.innerHTML = days
    .map((day, index) => {
      const dayKey = dayKeyFormatter.format(day);
      const dayMatches = filtered.filter((match) => dayKeyFormatter.format(new Date(match.start)) === dayKey);
      const items =
        state.isLoading
          ? '<div class="empty-state">加载中</div>'
          : dayMatches.length > 0
          ? dayMatches
              .map((match) => {
                const start = new Date(match.start);
                return `
                  <div class="mini-match ${escapeHtml(match.sport)} ${match.youth ? "youth" : ""} ${match.important ? "important" : ""}">
                    <span class="mini-time">${timeFormatter.format(start)}</span>
                    <span class="mini-title">${escapeHtml(match.home)} vs ${escapeHtml(match.away)}</span>
                    <span class="mini-competition">${escapeHtml(match.competition)}</span>
                    ${renderMiniPrediction(match)}
                  </div>
                `;
              })
              .join("")
          : '<div class="empty-state">无比赛</div>';

      return `
        <article class="day-column ${index === 0 ? "today" : ""}">
          <div class="day-head">
            <span class="day-name">${escapeHtml(formatter.format(day).split(" ")[0])}</span>
            <span class="day-date">${String(day.getMonth() + 1).padStart(2, "0")}.${String(day.getDate()).padStart(2, "0")}</span>
          </div>
          ${items}
        </article>
      `;
    })
    .join("");
}

function renderPrediction(match) {
  const prediction = match.prediction;
  const hasDraw = prediction.draw > 0;
  const leader = getPredictionLeader(match);

  return `
    <div class="prediction-card" aria-label="赛事胜率预测">
      <div class="prediction-head">
        <strong>胜率预测</strong>
        <span>${escapeHtml(prediction.source)} · 信心 ${escapeHtml(prediction.confidence)} · 规划参考</span>
      </div>
      <div class="prediction-bars">
        <div class="prediction-row">
          <span>${escapeHtml(shortTeamName(match.home))}</span>
          <div class="prediction-track"><i style="width: ${prediction.home}%"></i></div>
          <strong>${prediction.home}%</strong>
        </div>
        ${
          hasDraw
            ? `
              <div class="prediction-row draw">
                <span>平局</span>
                <div class="prediction-track"><i style="width: ${prediction.draw}%"></i></div>
                <strong>${prediction.draw}%</strong>
              </div>
            `
            : ""
        }
        <div class="prediction-row away">
          <span>${escapeHtml(shortTeamName(match.away))}</span>
          <div class="prediction-track"><i style="width: ${prediction.away}%"></i></div>
          <strong>${prediction.away}%</strong>
        </div>
      </div>
      <div class="prediction-summary">${escapeHtml(leader.label)} 暂占优，预测不是确定结果。</div>
    </div>
  `;
}

function renderMiniPrediction(match) {
  const leader = getPredictionLeader(match);
  return `<span class="mini-prediction">预测 ${escapeHtml(leader.shortLabel)} ${leader.value}%</span>`;
}

function getPredictionLeader(match) {
  const entries = [
    { label: match.home, shortLabel: shortTeamName(match.home), value: match.prediction.home },
    { label: "平局", shortLabel: "平", value: match.prediction.draw },
    { label: match.away, shortLabel: shortTeamName(match.away), value: match.prediction.away },
  ].filter((entry) => entry.value > 0);

  return entries.sort((a, b) => b.value - a.value)[0];
}

function shortTeamName(name) {
  const text = String(name || "");
  return text.length > 18 ? `${text.slice(0, 16)}...` : text;
}

function renderPlayers() {
  const filteredPlayers = getFilteredPlayers();

  if (state.isLoading) {
    playerList.innerHTML = '<div class="empty-state">正在加载球员信息...</div>';
    return;
  }

  if (filteredPlayers.length === 0) {
    playerList.innerHTML = '<div class="empty-state">当前搜索下没有匹配球星</div>';
    return;
  }

  playerList.innerHTML = filteredPlayers
    .slice(0, 12)
    .map((player) => {
      const countLabel = player.watchlisted ? "相关球队赛程" : "数据源提及";
      const isSelected = player.name === state.selectedPlayer;
      return `
        <button class="player-card ${isSelected ? "selected" : ""}" type="button" data-player-name="${escapeHtml(player.name)}" aria-pressed="${isSelected}" aria-label="查看 ${escapeHtml(player.name)} 相关赛程">
          ${renderAvatar(player)}
          <div class="player-info">
            <strong>${escapeHtml(player.name)}</strong>
            <span>${escapeHtml(player.team)} · ${player.count} 场${countLabel}</span>
          </div>
          <span class="status-dot ${escapeHtml(player.status)}" title="${escapeHtml(player.status)}"></span>
        </button>
      `;
    })
    .join("");
}

function renderAvatar(player) {
  if (!player.photoUrl) {
    return `<div class="avatar"><span>${escapeHtml(player.initials)}</span></div>`;
  }

  return `
    <div class="avatar photo">
      <img src="${escapeHtml(player.photoUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.remove('photo'); this.remove();" />
      <span>${escapeHtml(player.initials)}</span>
    </div>
  `;
}

function renderConflicts() {
  const sorted = [...matches].sort((a, b) => new Date(a.start) - new Date(b.start));
  const conflicts = [];

  for (let index = 0; index < sorted.length - 1; index += 1) {
    const current = sorted[index];
    const next = sorted[index + 1];
    const diffMinutes = Math.abs(new Date(next.start) - new Date(current.start)) / 60000;

    if (diffMinutes <= 150 && (current.important || next.important)) {
      conflicts.push([current, next]);
    }
  }

  if (state.isLoading) {
    conflictList.innerHTML = '<div class="empty-state">正在分析时间冲突...</div>';
    return;
  }

  if (conflicts.length === 0) {
    conflictList.innerHTML = '<div class="empty-state">暂无关注冲突</div>';
    return;
  }

  conflictList.innerHTML = conflicts
    .slice(0, 3)
    .map(([a, b]) => {
      const start = new Date(a.start);
      return `
        <div class="conflict-item">
          <strong>${timeFormatter.format(start)} 附近</strong>
          <span>${escapeHtml(a.home)} vs ${escapeHtml(a.away)} / ${escapeHtml(b.home)} vs ${escapeHtml(b.away)}</span>
        </div>
      `;
    })
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function selectPlayer(playerName) {
  state.selectedPlayer = playerName;
  state.playerFocus = true;
  state.importantFocus = false;
  state.search = "";
  document.querySelector("#searchInput").value = "";

  const relatedCount = matches.filter((match) => matchIncludesPlayer(match, playerName)).length;
  renderAll();
  document.querySelector("#calendar").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(relatedCount > 0 ? `已筛选 ${playerName} 相关赛程` : `${playerName} 暂无未来赛程`);
}

function submitSearch() {
  const keyword = state.search.trim();
  const resultCount = getFilteredMatches().length;

  if (!keyword) {
    showToast("请输入赛事、球队或球星关键词");
    return;
  }

  renderAll();
  document.querySelector("#calendar").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(resultCount > 0 ? `找到 ${resultCount} 场相关比赛` : `没有找到 “${keyword}” 相关比赛`);
}

function renderAll() {
  renderMetrics();
  renderCalendar();
  renderMatchList();
  renderPlayers();
  renderConflicts();
}

document.querySelectorAll("[data-filter-group]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.filterGroup;
    state[group] = button.dataset.filterValue;
    document.querySelectorAll(`[data-filter-group="${group}"]`).forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderAll();
  });
});

document.querySelector("#regionSelect").addEventListener("change", (event) => {
  state.region = event.target.value;
  renderAll();
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.search = event.target.value;
  state.selectedPlayer = "";
  renderAll();
});

document.querySelector("#searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitSearch();
  }
});

if (themeSelect) {
  applyTheme(localStorage.getItem("sportx-theme") || document.documentElement.dataset.theme);

  themeSelect.addEventListener("change", (event) => {
    applyTheme(event.target.value);
    showToast(`已切换为${THEME_LABELS[getValidTheme(event.target.value)]}风格`);
  });
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderCalendar();
  });
});

document.querySelector("#clearFilters").addEventListener("click", () => {
  state.sport = "all";
  state.type = "all";
  state.region = "all";
  state.search = "";
  state.playerFocus = false;
  state.selectedPlayer = "";
  state.importantFocus = false;
  document.querySelector("#searchInput").value = "";
  document.querySelector("#regionSelect").value = "all";
  document.querySelectorAll("[data-filter-group]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filterValue === "all");
  });
  renderAll();
  showToast("筛选已重置");
});

document.querySelector("#focusImportant").addEventListener("click", () => {
  state.importantFocus = true;
  state.search = "";
  document.querySelector("#searchInput").value = "";
  renderAll();
  showToast("已聚焦重点比赛");
});

document.querySelector("#focusPlayers").addEventListener("click", () => {
  state.playerFocus = true;
  state.selectedPlayer = "";
  renderAll();
  document.querySelector("#players").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("已显示球星相关赛程");
});

document.querySelector("#refreshData").addEventListener("click", () => {
  showToast("正在刷新真实赛程");
  loadRealData();
});

document.querySelector("#exportButton").addEventListener("click", () => {
  showToast("日历导出入口已预留");
});

document.body.addEventListener("click", (event) => {
  const playerButton = event.target.closest("[data-player-name]");
  if (playerButton) {
    selectPlayer(playerButton.dataset.playerName);
    return;
  }

  const toastButton = event.target.closest("[data-toast]");
  if (toastButton) {
    showToast(toastButton.dataset.toast);
  }

  const followChip = event.target.closest(".follow-chip");
  if (followChip) {
    followChip.classList.toggle("selected");
    showToast(followChip.classList.contains("selected") ? "已加入关注" : "已取消关注");
  }
});

renderAll();
loadRealData();

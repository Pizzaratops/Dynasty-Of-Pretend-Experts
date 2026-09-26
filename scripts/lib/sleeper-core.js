// ============================================================
//  SLEEPER-CORE — reine Transformationslogik (keine Netzwerk-/Datei-
//  Zugriffe). Wandelt rohe Sleeper-API-Antworten in exakt die Daten-
//  formate um, die js/app.js erwartet (dieselben Formate wie beim
//  ESPN-Vorbild Bear Witch Project HQ).
//
//  Isomorph: wird in Node von scripts/sync-sleeper.js per require()
//  geladen, laesst sich aber auch 1:1 im Browser ausfuehren (zum Testen
//  gegen die echte Liga, siehe README "Sync lokal testen").
// ============================================================

(function (root) {
  'use strict';

  const STATUS_MAP = {
    Questionable: 'Q', Doubtful: 'D', Out: 'O', IR: 'IR', PUP: 'PUP',
    Sus: 'SUSP', NA: 'NA', COV: 'COV', DNR: 'DNR',
  };
  const ROUND_LABELS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  const DEFAULT_EMOJIS = ['🦈', '🐢', '🦥', '🐻', '⚡', '🧀', '🐀', '🦬', '🦁', '🦆', '🐺', '🦅', '🐍', '🦄', '🐉', '🦊'];

  function round1(n) { return Math.round(n * 10) / 10; }
  function round2(n) { return Math.round(n * 100) / 100; }

  function slugify(s) {
    return String(s || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'team';
  }

  // Namens-Schluessel fuer den Abgleich zwischen Quellen (Sleeper vs.
  // KTC/FantasyPros): Akzente, Satzzeichen und Namenszusaetze (Jr., III ...)
  // fliegen raus. "Kenneth Walker" == "Kenneth Walker III".
  function nameKey(s) {
    return String(s || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function buildCanon(canonNames) {
    const map = {};
    (canonNames || []).forEach(n => { const k = nameKey(n); if (k && !map[k]) map[k] = n; });
    return map;
  }

  // Einheitlicher Spieler-Deskriptor aus einem Sleeper-Spielerobjekt
  // (players/nfl, oder das "player"-Feld der stats/projections-Endpoints).
  function describePlayer(id, p, canon) {
    p = p || {};
    // Zwei-Wege-Spieler (z.B. Travis Hunter: position "DB", fantasy_positions
    // ["WR","DB"]) -> die Fantasy-relevante Offensiv-Position nehmen, sonst
    // fallen seine Punkte aus POSITION_POINTS und er steht als "DB" im Kader.
    const FANTASY_POS = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
    const fps = p.fantasy_positions || [];
    const pos = FANTASY_POS.includes(p.position) ? p.position
      : (fps.find(x => FANTASY_POS.includes(x)) || p.position || fps[0] || '?');
    if (pos === 'DEF' || /^[A-Z]{2,3}$/.test(String(id))) {
      const nick = p.last_name || String(id);
      return { name: `${nick} D/ST`, pos: 'D/ST', nfl: p.team || String(id) };
    }
    let name = p.full_name || [p.first_name, p.last_name].filter(Boolean).join(' ') || `#${id}`;
    const c = canon && canon[nameKey(name)];
    if (c) name = c;
    return { name, pos, nfl: p.team || 'FA' };
  }

  function mapStatus(s) { return s ? (STATUS_MAP[s] || s) : null; }

  // Fantasy-Punkte aus Rohstatistiken mit den ECHTEN Liga-Scoring-Settings.
  function scorePoints(stats, scoring) {
    if (!stats) return 0;
    let pts = 0;
    for (const k in scoring) {
      const v = stats[k];
      if (typeof v === 'number') pts += v * scoring[k];
    }
    // Projektionen (rotowire) liefern Kicker teils nur grob gebuckelt:
    // fgm_50p statt fgm_50_59/fgm_60p, fgmiss_* statt fgmiss.
    if (stats.fgm_50p != null && stats.fgm_50_59 == null && stats.fgm_60p == null && scoring.fgm_50_59 != null) {
      pts += stats.fgm_50p * scoring.fgm_50_59;
    }
    if (stats.fgmiss == null && scoring.fgmiss != null) {
      ['fgmiss_0_19', 'fgmiss_20_29', 'fgmiss_30_39', 'fgmiss_40_49', 'fgmiss_50p'].forEach(k => {
        if (typeof stats[k] === 'number') pts += stats[k] * scoring.fgmiss;
      });
    }
    return pts;
  }

  // ---------------- Teams ----------------
  function buildTeams(raw, existingTeams) {
    const usersById = {};
    (raw.users || []).forEach(u => { usersById[u.user_id] = u; });
    const existingById = {};
    (existingTeams || []).forEach(t => { existingById[t.id] = t; });
    const usedIds = new Set();
    const teams = (raw.rosters || []).slice().sort((a, b) => a.roster_id - b.roster_id).map((r, i) => {
      const u = usersById[r.owner_id] || {};
      const display = u.display_name || `Team ${r.roster_id}`;
      let id = slugify(display);
      while (usedIds.has(id)) id += '-' + r.roster_id;
      usedIds.add(id);
      const prev = existingById[id] || {};
      const teamName = (u.metadata && u.metadata.team_name) || display;
      return {
        id,
        name: teamName,
        emoji: prev.emoji || DEFAULT_EMOJIS[i % DEFAULT_EMOJIS.length],
        owner: prev.owner || display,
        sleeperUser: display,
        rosterId: r.roster_id,
        userId: r.owner_id || null,
      };
    });
    return teams;
  }

  // ---------------- Rosters ----------------
  function buildRosters(raw, teams, canon) {
    const byRoster = {};
    teams.forEach(t => { byRoster[t.rosterId] = t; });
    const players = raw.players || {};
    const rosters = {}, records = {}, recordDetail = {};
    (raw.rosters || []).forEach(r => {
      const t = byRoster[r.roster_id];
      if (!t) return;
      const starters = new Set(r.starters || []);
      const taxi = new Set(r.taxi || []);
      const reserve = new Set(r.reserve || []);
      rosters[t.id] = (r.players || []).map(pid => {
        const p = players[pid];
        const d = describePlayer(pid, p, canon);
        const out = { name: d.name, pos: d.pos, nfl: d.nfl, isStarter: starters.has(pid) };
        const st = mapStatus(p && p.injury_status);
        if (st) out.status = st;
        if (reserve.has(pid)) { out.slot = 'IR'; if (!out.status) out.status = 'IR'; }
        if (taxi.has(pid)) out.slot = 'TAXI';
        if (p && p.years_exp === 0) out.rookie = true;
        return out;
      }).sort((a, b) => (b.isStarter - a.isStarter) || posOrder(a.pos) - posOrder(b.pos));
      const s = r.settings || {};
      records[t.id] = `${s.wins || 0}-${s.losses || 0}-${s.ties || 0}`;
      recordDetail[t.id] = {
        wins: s.wins || 0, losses: s.losses || 0, ties: s.ties || 0,
        pf: round2((s.fpts || 0) + (s.fpts_decimal || 0) / 100),
        pa: round2((s.fpts_against || 0) + (s.fpts_against_decimal || 0) / 100),
        waiverBudgetUsed: s.waiver_budget_used || 0,
      };
    });
    return { rosters, records, recordDetail };
  }

  function posOrder(pos) {
    return { QB: 1, RB: 2, WR: 3, TE: 4, K: 5, 'D/ST': 6 }[pos] || 9;
  }

  // ---------------- Matchups / Scores / Schedule ----------------
  function lastCompletedWeek(raw) {
    const s = raw.league.settings || {};
    if (raw.league.status === 'complete') return s.last_scored_leg || 17;
    // last_scored_leg = letzte Woche, deren Punkte final sind
    return s.last_scored_leg || 0;
  }

  function pairMatchups(list) {
    const byId = {};
    (list || []).forEach(m => {
      if (m.matchup_id == null) return;
      (byId[m.matchup_id] = byId[m.matchup_id] || []).push(m);
    });
    return Object.keys(byId).sort((a, b) => a - b).map(k => byId[k]).filter(p => p.length === 2);
  }

  function buildScoresAndSchedule(raw, teams, season, canon) {
    const byRoster = {};
    teams.forEach(t => { byRoster[t.rosterId] = t.id; });
    const lastWeek = lastCompletedWeek(raw);
    const hasMedian = !!(raw.league.settings && raw.league.settings.league_average_match);
    const regularWeeks = (raw.league.settings && raw.league.settings.playoff_week_start)
      ? raw.league.settings.playoff_week_start - 1 : 14;
    const weekly = {}, schedule = {}, positionPoints = {};

    Object.keys(raw.matchupsByWeek || {}).map(Number).sort((a, b) => a - b).forEach(week => {
      const list = raw.matchupsByWeek[week] || [];
      const pairs = pairMatchups(list);
      if (week <= regularWeeks && pairs.length) {
        schedule[week] = pairs.map(([a, b]) => ({ home: byRoster[a.roster_id], away: byRoster[b.roster_id] }));
      }
      if (week > lastWeek) return;

      const pts = list.map(m => m.points || 0).sort((a, b) => a - b);
      const median = pts.length ? (pts.length % 2 ? pts[(pts.length - 1) / 2] : (pts[pts.length / 2 - 1] + pts[pts.length / 2]) / 2) : null;
      const entries = [];
      pairs.forEach(([a, b]) => {
        [[a, b], [b, a]].forEach(([me, opp]) => {
          const e = {
            teamId: byRoster[me.roster_id],
            points: round2(me.points || 0),
            opponentId: byRoster[opp.roster_id],
            opponentPoints: round2(opp.points || 0),
          };
          if (hasMedian && week <= regularWeeks && median != null) {
            e.medianResult = me.points > median ? 'W' : me.points < median ? 'L' : 'T';
          }
          if (week > regularWeeks) e.playoff = true;
          entries.push(e);
        });
      });
      if (entries.length) weekly[week] = entries;

      // Punkte nach echter Position der Starter (fuer Fantasy Power Score)
      const pp = {};
      list.forEach(m => {
        const tid = byRoster[m.roster_id];
        if (!tid) return;
        const bucket = { qbPts: 0, rbPts: 0, wrPts: 0, tePts: 0, kPts: 0, defPts: 0 };
        (m.starters || []).forEach((pid, i) => {
          if (!pid || pid === '0') return;
          const d = describePlayer(pid, (raw.players || {})[pid], canon);
          const val = (m.starters_points && m.starters_points[i] != null) ? m.starters_points[i]
            : (m.players_points ? m.players_points[pid] || 0 : 0);
          const key = { QB: 'qbPts', RB: 'rbPts', WR: 'wrPts', TE: 'tePts', K: 'kPts', 'D/ST': 'defPts' }[d.pos];
          if (key) bucket[key] += val;
        });
        Object.keys(bucket).forEach(k => { bucket[k] = round2(bucket[k]); });
        pp[tid] = bucket;
      });
      positionPoints[week] = pp;
    });

    return {
      weeklyScores: { [season]: weekly },
      schedule: { [season]: schedule },
      positionPoints: { [season]: positionPoints },
      lastWeek,
    };
  }

  // ---------------- Draft (Rookie Draft) ----------------
  function buildDraft(raw, teams, canon) {
    const byRoster = {}, byUser = {};
    teams.forEach(t => { byRoster[t.rosterId] = t; if (t.userId) byUser[t.userId] = t; });
    const drafts = raw.drafts || [];
    const draft = drafts.find(d => d.draft_id === raw.league.draft_id) || drafts[0] || null;
    const out = {
      season: draft ? Number(draft.season) : null,
      draftId: draft ? draft.draft_id : null,
      status: draft ? draft.status : null,
      type: draft ? draft.type : null,
      rounds: draft ? (draft.settings && draft.settings.rounds) || 4 : (raw.league.settings.draft_rounds || 4),
      startTime: draft && draft.start_time ? new Date(draft.start_time).toISOString() : null,
      order: [],
      results: {},
      tradedPicks: [],
    };
    if (!draft) return out;

    // Slot -> urspruengliches Team. slot_to_roster_id ist nicht immer
    // gesetzt, draft_order (user_id -> slot) dagegen schon.
    const slotTeam = {};
    if (draft.slot_to_roster_id) {
      Object.entries(draft.slot_to_roster_id).forEach(([slot, rid]) => { slotTeam[slot] = byRoster[rid]; });
    } else if (draft.draft_order) {
      Object.entries(draft.draft_order).forEach(([uid, slot]) => { slotTeam[slot] = byUser[uid]; });
    }
    const nTeams = teams.length;
    // Nur wenn Sleeper die Reihenfolge schon kennt -- sonst leer lassen
    if (Object.keys(slotTeam).length) for (let s = 1; s <= nTeams; s++) out.order.push(slotTeam[s] ? slotTeam[s].name : `Slot ${s}`);

    const picks = (raw.draftPicks && raw.draftPicks[draft.draft_id]) || [];
    picks.forEach(pk => {
      // WICHTIG: roster_id = Team, das den Pick tatsaechlich gemacht hat
      // (Besitzer nach Trades). picked_by ist nur der klickende User
      // (kann auch der Commissioner sein) -> NICHT fuer die Zuordnung nutzen.
      const t = byRoster[pk.roster_id];
      const md = pk.metadata || {};
      const d = describePlayer(pk.player_id, {
        first_name: md.first_name, last_name: md.last_name, position: md.position, team: md.team,
      }, canon);
      out.results[pk.round] = out.results[pk.round] || [];
      out.results[pk.round][pk.draft_slot - 1] = { team: t ? t.name : `Roster ${pk.roster_id}`, name: d.name, nfl: d.nfl, pos: d.pos, pickNo: pk.pick_no };
    });
    Object.keys(out.results).forEach(r => {
      for (let i = 0; i < nTeams; i++) if (!out.results[r][i]) out.results[r][i] = null;
    });

    if (draft.status !== 'complete') {
      (raw.tradedPicks || []).filter(p => String(p.season) === String(draft.season) && p.owner_id !== p.roster_id).forEach(p => {
        const from = byRoster[p.roster_id], owner = byRoster[p.owner_id];
        if (from && owner) out.tradedPicks.push({ round: p.round, from: from.name, owner: owner.name });
      });
    }
    return out;
  }

  // ---------------- Future Picks ----------------
  function buildFuturePicks(raw, teams, draftSeason, draftComplete) {
    const byRoster = {};
    teams.forEach(t => { byRoster[t.rosterId] = t; });
    const season = Number(raw.league.season);
    // "Zukunft" = alle Draft-Jahre NACH dem aktuellen Rookie-Draft
    // (bzw. inkl. aktuellem Jahr, falls der noch nicht gelaufen ist, dann
    // steckt er aber schon in TRADED_PICKS des Draft Boards).
    const firstFuture = draftComplete ? (draftSeason || season) + 1 : (draftSeason || season) + 1;
    const years = [firstFuture, firstFuture + 1, firstFuture + 2];
    const fp = {};
    years.forEach(y => { fp[y] = []; });
    (raw.tradedPicks || []).forEach(p => {
      const y = Number(p.season);
      if (!fp[y] || p.owner_id === p.roster_id) return;
      const from = byRoster[p.roster_id], owner = byRoster[p.owner_id];
      if (!from || !owner) return;
      fp[y].push({ round: ROUND_LABELS[p.round - 1] || `R${p.round}`, from: from.name, owner: owner.name });
    });
    const rOrder = l => ROUND_LABELS.indexOf(l);
    Object.values(fp).forEach(list => list.sort((a, b) => rOrder(a.round) - rOrder(b.round) || a.from.localeCompare(b.from)));
    return fp;
  }

  // ---------------- Trades ----------------
  function buildTrades(raw, teams, canon) {
    const byRoster = {};
    teams.forEach(t => { byRoster[t.rosterId] = t; });
    const players = raw.players || {};
    const trades = (raw.transactions || [])
      .filter(tx => tx.type === 'trade' && tx.status === 'complete')
      .sort((a, b) => (b.status_updated || b.created) - (a.status_updated || a.created))
      .map(tx => {
        const gives = {}; // roster_id -> [labels]
        const gets = {};
        (tx.roster_ids || []).forEach(rid => { gives[rid] = []; gets[rid] = []; });
        Object.entries(tx.adds || {}).forEach(([pid, toRid]) => {
          const fromRid = tx.drops ? tx.drops[pid] : null;
          const label = describePlayer(pid, players[pid], canon).name;
          if (fromRid != null && gives[fromRid]) gives[fromRid].push(label);
          if (gets[toRid]) gets[toRid].push(label);
        });
        (tx.draft_picks || []).forEach(p => {
          const orig = byRoster[p.roster_id];
          const lbl = `${p.season} ${ROUND_LABELS[p.round - 1] || 'R' + p.round}` +
            (p.roster_id !== p.previous_owner_id && orig ? ` (via ${orig.name})` : '');
          if (gives[p.previous_owner_id]) gives[p.previous_owner_id].push(lbl);
          if (gets[p.owner_id]) gets[p.owner_id].push(lbl);
        });
        (tx.waiver_budget || []).forEach(w => {
          const lbl = `$${w.amount} FAAB`;
          if (gives[w.sender]) gives[w.sender].push(lbl);
          if (gets[w.receiver]) gets[w.receiver].push(lbl);
        });
        const rids = tx.roster_ids || [];
        const name = rid => (byRoster[rid] ? byRoster[rid].name : `Roster ${rid}`);
        const date = new Date(tx.status_updated || tx.created).toISOString().slice(0, 10);
        const t = {
          date,
          week: tx.leg,
          teamA: name(rids[0]), teamAGives: gives[rids[0]] || [],
          teamB: name(rids[1]), teamBGives: gives[rids[1]] || [],
          id: tx.transaction_id,
        };
        if (rids.length > 2) {
          t.multi = rids.map(rid => ({ team: name(rid), gives: gives[rid] || [], gets: gets[rid] || [] }));
        }
        return t;
      });
    return trades;
  }

  // ---------------- Player Stats / Projections ----------------
  function buildPlayerStats(raw, season, lastWeek, canon) {
    const scoring = raw.league.scoring_settings || {};
    const byPlayer = {};
    Object.keys(raw.statsByWeek || {}).map(Number).sort((a, b) => a - b).forEach(week => {
      if (week > lastWeek) return;
      (raw.statsByWeek[week] || []).forEach(row => {
        const st = row.stats || {};
        if (!st.gp && !st.gms_active && !st.off_snp && row.player && row.player.position !== 'DEF') return;
        const d = describePlayer(row.player_id, row.player, canon);
        if (d.pos === '?') return;
        const pts = round1(scorePoints(st, scoring));
        const e = byPlayer[d.name] = byPlayer[d.name] || { name: d.name, team: d.nfl, pos: d.pos, weeklyPoints: {} };
        e.team = d.nfl; e.pos = d.pos;
        e.weeklyPoints[week] = pts;
      });
    });
    const players = Object.values(byPlayer).map(p => {
      const vals = Object.values(p.weeklyPoints);
      const total = vals.reduce((a, b) => a + b, 0);
      return { ...p, gamesPlayed: vals.length, totalPoints: round1(total), avgPoints: vals.length ? round1(total / vals.length) : 0 };
    }).filter(p => p.gamesPlayed > 0).sort((a, b) => b.totalPoints - a.totalPoints);
    return { season: Number(season), updated: new Date().toISOString(), players };
  }

  function buildProjections(raw, season, canon) {
    const scoring = raw.league.scoring_settings || {};
    const seen = new Set();
    const players = (raw.seasonProjections || []).map(row => {
      const d = describePlayer(row.player_id, row.player, canon);
      if (d.pos === '?' || seen.has(d.name)) return null;
      seen.add(d.name);
      const pts = round1(scorePoints(row.stats, scoring));
      if (!(pts > 0)) return null;
      return { name: d.name, team: d.nfl, pos: d.pos, projectedPoints: pts };
    }).filter(Boolean).sort((a, b) => b.projectedPoints - a.projectedPoints);
    return { season: Number(season), updated: new Date().toISOString(), players };
  }

  // ---------------- League Info ----------------
  function buildLeagueInfo(raw, lastWeek) {
    const L = raw.league, s = L.settings || {};
    return {
      leagueId: L.league_id,
      name: L.name,
      season: Number(L.season),
      status: L.status,
      avatar: L.avatar || null,
      totalRosters: L.total_rosters,
      rosterPositions: L.roster_positions || [],
      scoring: L.scoring_settings || {},
      settings: {
        type: s.type, playoffTeams: s.playoff_teams, playoffWeekStart: s.playoff_week_start,
        taxiSlots: s.taxi_slots, taxiYears: s.taxi_years, taxiAllowVets: s.taxi_allow_vets, taxiDeadline: s.taxi_deadline,
        reserveSlots: s.reserve_slots, draftRounds: s.draft_rounds, tradeDeadline: s.trade_deadline,
        waiverType: s.waiver_type, waiverBudget: s.waiver_budget, waiverDay: s.waiver_day_of_week,
        waiverClearDays: s.waiver_clear_days, dailyWaivers: s.daily_waivers, leagueAverageMatch: s.league_average_match,
        pickTrading: s.pick_trading, benchLock: s.bench_lock, vetoVotesNeeded: s.veto_votes_needed,
        tradeReviewDays: s.trade_review_days,
      },
      nflWeek: raw.state ? raw.state.week : null,
      lastScoredWeek: lastWeek,
      previousLeagueId: L.previous_league_id && L.previous_league_id !== '0' ? L.previous_league_id : null,
    };
  }

  function buildAll(raw, opts) {
    opts = opts || {};
    const season = Number(raw.league.season);
    const canon = buildCanon(opts.canonNames);
    const teams = buildTeams(raw, opts.existingTeams);
    const ros = buildRosters(raw, teams, canon);
    const sc = buildScoresAndSchedule(raw, teams, season, canon);
    const draft = buildDraft(raw, teams, canon);
    const futurePicks = buildFuturePicks(raw, teams, draft.season, draft.status === 'complete');
    const trades = buildTrades(raw, teams, canon);
    const out = {
      season, teams,
      rosters: ros.rosters, records: ros.records, recordDetail: ros.recordDetail,
      weeklyScores: sc.weeklyScores, schedule: sc.schedule, positionPoints: sc.positionPoints,
      draft, futurePicks, trades,
      leagueInfo: buildLeagueInfo(raw, sc.lastWeek),
    };
    if (raw.statsByWeek) out.playerStats = buildPlayerStats(raw, season, sc.lastWeek, canon);
    if (raw.seasonProjections) out.projections = buildProjections(raw, season, canon);
    return out;
  }

  const api = {
    buildAll, buildTeams, buildRosters, buildScoresAndSchedule, buildDraft, buildFuturePicks,
    buildTrades, buildPlayerStats, buildProjections, buildLeagueInfo,
    describePlayer, scorePoints, nameKey, slugify, ROUND_LABELS,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SleeperCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

// ============================================================
//  SLEEPER-FETCH — holt alle Rohdaten einer Sleeper-Liga
// ============================================================
//  Isomorph (Node 18+ / Browser, nutzt globales fetch). Liefert das
//  "raw"-Objekt, das scripts/lib/sleeper-core.js -> buildAll() erwartet.
//
//  Oeffentliche API, kein Login noetig:
//   https://api.sleeper.app/v1/...      (dokumentiert)
//   https://api.sleeper.com/stats|projections/...  (undokumentiert, aber
//     genau das, was die Sleeper-App selbst nutzt -- kann sich aendern)
// ============================================================

(function (root) {
  'use strict';

  const API = 'https://api.sleeper.app/v1';
  const API2 = 'https://api.sleeper.com';
  const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  async function getJson(url, tries) {
    tries = tries || 3;
    for (let i = 0; i < tries; i++) {
      try {
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status} für ${url}`);
        return await res.json();
      } catch (e) {
        if (i === tries - 1) throw e;
        await new Promise(r => setTimeout(r, 800 * (i + 1)));
      }
    }
  }

  function posQuery() { return POSITIONS.map(p => `position[]=${p}`).join('&'); }

  // opts: { leagueId, loadPlayers: async () => playersMap, withStats, withProjections, log }
  async function fetchRaw(opts) {
    const log = opts.log || (() => {});
    const L = opts.leagueId;
    const [state, league, users, rosters, tradedPicks, drafts] = await Promise.all([
      getJson(`${API}/state/nfl`),
      getJson(`${API}/league/${L}`),
      getJson(`${API}/league/${L}/users`),
      getJson(`${API}/league/${L}/rosters`),
      getJson(`${API}/league/${L}/traded_picks`),
      getJson(`${API}/league/${L}/drafts`),
    ]);
    if (!league || !league.league_id) throw new Error(`Liga ${L} nicht gefunden.`);
    const season = league.season;
    log(`Liga "${league.name}" (${season}), Status ${league.status}, NFL-Woche ${state.week}`);

    // Wochen 1..18 (Regular Season + Playoffs), Transaktionen 0..18
    const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
    const matchupLists = await Promise.all(weeks.map(w => getJson(`${API}/league/${L}/matchups/${w}`).catch(() => [])));
    const matchupsByWeek = {};
    weeks.forEach((w, i) => { if ((matchupLists[i] || []).length) matchupsByWeek[w] = matchupLists[i]; });

    const txLists = await Promise.all([0, ...weeks].map(w => getJson(`${API}/league/${L}/transactions/${w}`).catch(() => [])));
    const transactions = [].concat(...txLists);

    const draftPicks = {};
    const relevantDrafts = drafts.filter(d => d.draft_id === league.draft_id || d.status === 'complete');
    for (const d of relevantDrafts) {
      draftPicks[d.draft_id] = await getJson(`${API}/draft/${d.draft_id}/picks`).catch(() => []);
    }
    // slot_to_roster_id steht nur im Einzel-Draft-Objekt verlaesslich drin
    const mainDraft = drafts.find(d => d.draft_id === league.draft_id);
    if (mainDraft && !mainDraft.slot_to_roster_id) {
      const full = await getJson(`${API}/draft/${mainDraft.draft_id}`).catch(() => null);
      if (full && full.slot_to_roster_id) mainDraft.slot_to_roster_id = full.slot_to_roster_id;
    }

    const players = opts.loadPlayers ? await opts.loadPlayers() : {};

    const raw = { state, league, users, rosters, tradedPicks, drafts, draftPicks, matchupsByWeek, transactions, players };

    if (opts.withStats) {
      const last = (league.settings && league.settings.last_scored_leg) || 0;
      raw.statsByWeek = {};
      for (let w = 1; w <= last; w++) {
        raw.statsByWeek[w] = await getJson(`${API2}/stats/nfl/${season}/${w}?season_type=regular&${posQuery()}`).catch(e => { log(`⚠️ Stats Woche ${w}: ${e.message}`); return []; });
      }
    }
    if (opts.withProjections) {
      raw.seasonProjections = await getJson(`${API2}/projections/nfl/${season}?season_type=regular&${posQuery()}&order_by=pts_ppr`).catch(e => { log(`⚠️ Projections: ${e.message}`); return []; });
    }
    return raw;
  }

  // players/nfl ist ~5MB -> fuer Frontend/Sync nur die benoetigten Felder behalten
  function slimPlayers(all) {
    const out = {};
    Object.entries(all || {}).forEach(([id, p]) => {
      out[id] = {
        full_name: p.full_name, first_name: p.first_name, last_name: p.last_name,
        position: p.position, fantasy_positions: p.fantasy_positions, team: p.team,
        injury_status: p.injury_status, years_exp: p.years_exp,
      };
    });
    return out;
  }

  const api = { fetchRaw, getJson, slimPlayers, API, API2 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SleeperFetch = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

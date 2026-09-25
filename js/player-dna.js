// ============================================================
//  PLAYER DNA — Perzentil-Radar fuer NFL-Spieler (QB/RB/WR/TE)
// ============================================================
//  NFL-Pendant zum "Cat Web" aus Taco Tuesday HQ. Daten: data/player-dna.js
//  (scripts/sync-player-dna.js, nflverse), wird erst beim Oeffnen der Seite
//  nachgeladen (~350 KB), damit der Rest der Seite schnell bleibt.
//
//  Pool = alle NFL-Spieler der Position mit Mindest-Volumen, die Liste links
//  zeigt standardmaessig nur Spieler aus DPE-Kadern (umschaltbar).
//
//  DNA-Match: bestes Profil in derselben Saison ("Aktuelles Match") und ueber
//  alle anderen Saisons ab 2016 ("Historisches Match"). Score = 100 minus
//  mittlerer Perzentil-Abstand ueber alle Kategorien mit Wert bei beiden.
// ============================================================

const DNA_POSITIONS = ['QB', 'RB', 'WR', 'TE'];
const DNA_COLORS = ['#20d3c2', '#f25c8a', '#ffca28'];
let dnaState = { season: null, pos: 'WR', search: '', rosteredOnly: true, sel: null, compare: [], sort: 'dna' };
let _dnaChart = null;
let _dnaLoading = null;

function _dnaLoad() {
  if (typeof PLAYER_DNA !== 'undefined') return Promise.resolve();
  if (_dnaLoading) return _dnaLoading;
  _dnaLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/player-dna.js?v=' + Math.floor(Date.now() / 3600000); // stuendlich frisch
    s.onload = () => resolve();
    s.onerror = () => { _dnaLoading = null; reject(new Error('data/player-dna.js nicht ladbar')); };
    document.head.appendChild(s);
  });
  return _dnaLoading;
}

// gleiche Normalisierung wie scripts/lib/sleeper-core.js (nameKey)
function _dnaKey(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv|v)\b\.?/g, '').replace(/[^a-z0-9]/g, '');
}

let _dnaOwnerIdx = null;
function _dnaOwner(name) {
  if (!_dnaOwnerIdx) {
    _dnaOwnerIdx = {};
    if (typeof ROSTERS_LIVE !== 'undefined') {
      Object.entries(ROSTERS_LIVE).forEach(([tid, list]) => (list || []).forEach(p => {
        _dnaOwnerIdx[_dnaKey(p.name)] = LEAGUE_TEAMS.find(t => t.id === tid) || null;
      }));
    }
  }
  return _dnaOwnerIdx[_dnaKey(name)] || null;
}

const _dnaAvg = p => { const v = p.p.filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
const _dnaPlayers = (season, pos) => ((PLAYER_DNA.seasons[season] || {}).players || {})[pos] || [];
const _dnaFind = (season, pos, id) => _dnaPlayers(season, pos).find(p => p.id === id) || null;

function _dnaDistance(a, b) {
  let sum = 0, n = 0;
  a.p.forEach((v, i) => { if (v != null && b.p[i] != null) { sum += Math.abs(v - b.p[i]); n++; } });
  return n >= Math.min(6, a.p.length - 1) ? sum / n : null;
}

function _dnaMatches(season, pos, player, historic) {
  const out = [];
  Object.keys(PLAYER_DNA.seasons).forEach(y => {
    if (historic ? String(y) === String(season) : String(y) !== String(season)) return;
    _dnaPlayers(y, pos).forEach(o => {
      if (o.id === player.id && String(y) === String(season)) return;
      if (historic && o.id === player.id) return; // sich selbst in anderen Jahren nicht als "historisch" werten
      const d = _dnaDistance(player, o);
      if (d != null) out.push({ season: y, p: o, score: Math.round(100 - d) });
    });
  });
  return out.sort((a, b) => b.score - a.score).slice(0, 3);
}

function _dnaFmt(v, cat) {
  if (v == null) return '—';
  const abs = Math.abs(v);
  const s = abs >= 100 ? v.toFixed(0) : abs >= 10 ? v.toFixed(1) : v.toFixed(2);
  return s.replace('.', ',');
}

function _dnaPctColor(p) {
  if (p == null) return 'var(--border)';
  if (p >= 80) return 'var(--accent)';
  if (p >= 60) return 'color-mix(in srgb, var(--accent) 60%, var(--muted))';
  if (p >= 40) return 'var(--muted)';
  if (p >= 20) return 'color-mix(in srgb, var(--accent2) 60%, var(--muted))';
  return 'var(--accent2)';
}

/* ---------- Einstieg ---------- */
function showPlayerDna() {
  navigate('playerdna');
  renderPlayerDna();
}

// Aus dem Kader heraus: Spieler direkt oeffnen
function openPlayerDna(name, pos) {
  navigate('playerdna');
  _dnaLoad().then(() => {
    const season = String(PLAYER_DNA.current);
    const key = _dnaKey(name);
    let hit = null, hitSeason = season;
    // aktuelle Saison zuerst, sonst juengste Saison, in der er im Pool war
    const years = Object.keys(PLAYER_DNA.seasons).sort((a, b) => b - a);
    for (const y of years) {
      hit = _dnaPlayers(y, pos).find(p => _dnaKey(p.n) === key);
      if (hit) { hitSeason = y; break; }
    }
    dnaState.pos = pos;
    dnaState.season = hitSeason;
    dnaState.sel = hit ? hit.id : null;
    dnaState.compare = [];
    dnaState.search = '';
    renderPlayerDna(hit ? null : `${name} erfüllt in keiner Saison ab 2016 das Mindest-Volumen für den ${pos}-Pool.`);
    if (hit) setTimeout(_dnaScrollMain, 50);
  }).catch(e => renderPlayerDna(e.message));
}

function renderPlayerDna(notice) {
  const wrap = document.getElementById('playerdnaContent');
  if (!wrap) return;
  if (typeof PLAYER_DNA === 'undefined') {
    wrap.innerHTML = `<div class="page-sub">🧬 Lade Player-DNA-Daten …</div>`;
    _dnaLoad().then(() => renderPlayerDna(notice)).catch(e => {
      wrap.innerHTML = emptyState('Keine Player-DNA-Daten', `${e.message}. Die GitHub Action "Player DNA Sync" erzeugt sie.`, '🧬');
    });
    return;
  }
  const seasons = Object.keys(PLAYER_DNA.seasons).sort((a, b) => b - a);
  if (!dnaState.season || !PLAYER_DNA.seasons[dnaState.season]) dnaState.season = String(PLAYER_DNA.current);
  const season = dnaState.season, pos = dnaState.pos;
  const weeks = PLAYER_DNA.seasons[season].weeks;
  const all = _dnaPlayers(season, pos);
  if (!dnaState.sel || !all.some(p => p.id === dnaState.sel)) {
    const firstOwned = all.slice().sort((a, b) => _dnaAvg(b) - _dnaAvg(a)).find(p => _dnaOwner(p.n));
    dnaState.sel = (firstOwned || all[0] || {}).id || null;
  }

  wrap.innerHTML = `
    ${notice ? `<div class="info-banner">${notice}</div>` : ''}
    <div class="dna-controls">
      <div class="rr-tb-group">${DNA_POSITIONS.map(p => `<button class="rr-tb-btn${p === pos ? ' rr-tb-active' : ''}" onclick="dnaSetPos('${p}')">${p}</button>`).join('')}</div>
      <select class="dna-select" onchange="dnaSetSeason(this.value)">
        ${seasons.map(y => `<option value="${y}"${y === season ? ' selected' : ''}>${y}${String(y) === String(PLAYER_DNA.current) ? ` (bis Woche ${PLAYER_DNA.seasons[y].weeks})` : ''}</option>`).join('')}
      </select>
      <label class="dna-toggle"><input type="checkbox" ${dnaState.rosteredOnly ? 'checked' : ''} onchange="dnaState.rosteredOnly=this.checked;_dnaRenderList()"> nur DPE-Kader</label>
    </div>
    <div class="dna-layout">
      <div class="dna-side">
        <input class="dna-search" placeholder="🔍 Spieler suchen …" value="${dnaState.search.replace(/"/g, '&quot;')}" oninput="dnaState.search=this.value;_dnaRenderList()">
        <div class="dna-list-head"><span>Spieler</span><span title="Ø Perzentil über alle Kategorien">DNA Ø</span></div>
        <div class="dna-list" id="dnaList"></div>
        <div class="dna-foot">Pool ${season}: ${all.length} ${pos}s mit Mindest-Volumen (${weeks} Wochen). Perzentile gegen die ganze NFL, nicht nur DPE.</div>
      </div>
      <div class="dna-main" id="dnaMain"></div>
    </div>`;
  _dnaRenderList();
  _dnaRenderMain();
}

function dnaSetPos(p) { dnaState.pos = p; dnaState.sel = null; dnaState.compare = []; renderPlayerDna(); }
function dnaSetSeason(y) {
  const prev = dnaState.sel ? _dnaFind(dnaState.season, dnaState.pos, dnaState.sel) : null;
  dnaState.season = String(y);
  // gleichen Spieler behalten, falls er auch in der neuen Saison im Pool ist
  dnaState.sel = prev && _dnaFind(y, dnaState.pos, prev.id) ? prev.id : null;
  dnaState.compare = [];
  renderPlayerDna();
}
function dnaSelect(id) { dnaState.sel = id; dnaState.compare = []; _dnaRenderList(); _dnaRenderMain(); _dnaScrollMain(); }
function _dnaScrollMain() {
  // Mobil liegt das Profil unter der Liste -> nach Auswahl hinscrollen
  if (window.innerWidth > 900) return;
  const m = document.getElementById('dnaMain');
  if (m) m.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function _dnaRenderList() {
  const host = document.getElementById('dnaList');
  if (!host) return;
  const q = _dnaKey(dnaState.search);
  const list = _dnaPlayers(dnaState.season, dnaState.pos)
    .map(p => ({ p, owner: _dnaOwner(p.n), avg: _dnaAvg(p) }))
    .filter(x => (!dnaState.rosteredOnly || x.owner || q) && (!q || _dnaKey(x.p.n).includes(q)))
    .sort((a, b) => b.avg - a.avg);
  host.innerHTML = list.length ? list.map((x, i) => `
    <div class="dna-row${x.p.id === dnaState.sel ? ' active' : ''}" onclick="dnaSelect('${x.p.id}')">
      <span class="dna-row-idx">${i + 1}</span>
      <span class="dna-row-name">${x.p.n} <small>${x.p.t}${x.owner ? ` · ${x.owner.emoji}` : ' · FA'}</small></span>
      <span class="dna-row-avg" style="color:${_dnaPctColor(x.avg)}">${Math.round(x.avg)}</span>
    </div>`).join('') : `<div class="page-sub" style="padding:12px">Keine Treffer.</div>`;
}

function dnaAddCompare(season, id) {
  if (dnaState.compare.some(c => c.season === String(season) && c.id === id)) return;
  if (String(season) === dnaState.season && id === dnaState.sel) return;
  dnaState.compare = dnaState.compare.concat([{ season: String(season), id }]).slice(-2); // max. 3 Profile gesamt
  _dnaRenderMain();
}
function dnaRemoveCompare(i) { dnaState.compare.splice(i, 1); _dnaRenderMain(); }

function _dnaRenderMain() {
  const host = document.getElementById('dnaMain');
  if (!host) return;
  const { season, pos } = dnaState;
  const cats = PLAYER_DNA.categories[pos];
  const me = dnaState.sel ? _dnaFind(season, pos, dnaState.sel) : null;
  if (!me) { host.innerHTML = emptyState('Kein Spieler gewählt', 'Links einen Spieler auswählen.', '🧬'); return; }

  const entries = [{ season, p: me }].concat(dnaState.compare.map(c => ({ season: c.season, p: _dnaFind(c.season, pos, c.id) })).filter(e => e.p));
  const owner = _dnaOwner(me.n);
  const avg = Math.round(_dnaAvg(me));
  const best = cats.map((c, i) => ({ c, v: me.p[i] })).filter(x => x.v != null).sort((a, b) => b.v - a.v);
  const cur = _dnaMatches(season, pos, me, false);
  const hist = _dnaMatches(season, pos, me, true);
  const matchHtml = (title, list, sub) => `
    <div class="dna-match-box">
      <div class="dna-match-title">${title}</div>
      ${list.length ? list.map(m => {
        const o = _dnaOwner(m.p.n);
        return `<div class="dna-match" onclick="dnaAddCompare('${m.season}','${m.p.id}')" title="Zum Vergleich hinzufügen">
          <span class="dna-match-score">${m.score}%</span>
          <span class="dna-match-name">${m.p.n} <small>${sub ? m.season + ' · ' : ''}${m.p.t}${o ? ' · ' + o.emoji : ''}</small></span>
          <span class="dna-match-add">＋</span>
        </div>`;
      }).join('') : '<div class="page-sub">Kein vergleichbares Profil.</div>'}
    </div>`;

  host.innerHTML = `
    <div class="dna-head">
      <div>
        <div class="dna-name">${me.n}</div>
        <div class="page-sub">${pos} · ${me.t} · ${season} · ${me.g} Spiele${owner ? ` · ${owner.emoji} ${owner.name}` : ' · Free Agent'}</div>
      </div>
      <div class="dna-score" style="border-color:${_dnaPctColor(avg)}"><b style="color:${_dnaPctColor(avg)}">${avg}</b><small>DNA Ø</small></div>
    </div>
    ${best.length ? `<div class="dna-tags">Stärken: ${best.slice(0, 2).map(x => `<b>${x.c.label}</b>`).join(' & ')} · Schwäche: <b>${best[best.length - 1].c.label}</b></div>` : ''}
    <div class="dna-grid">
      <div class="dna-chart-card">
        <canvas id="dnaCanvas"></canvas>
        ${entries.length > 1 ? `<div class="dna-compare-chips">${entries.map((e, i) => `
          <span class="dna-chip" style="border-color:${DNA_COLORS[i]}"><i style="background:${DNA_COLORS[i]}"></i>${e.p.n} ${e.season}${i ? ` <a onclick="dnaRemoveCompare(${i - 1})">✕</a>` : ''}</span>`).join('')}</div>` : ''}
      </div>
      <div>
        <table class="dna-table">
          <thead><tr><th>Kategorie</th><th>Wert</th><th>Perzentil</th></tr></thead>
          <tbody>${cats.map((c, i) => `
            <tr>
              <td><b>${c.label}</b><small>${c.unit}${c.invert ? ' · weniger ist besser' : ''}</small></td>
              <td>${_dnaFmt(me.v[i], c)}</td>
              <td><div class="dna-bar"><div style="width:${me.p[i] ?? 0}%;background:${_dnaPctColor(me.p[i])}"></div><span>${me.p[i] ?? '—'}</span></div></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
    <div class="dna-matches">
      ${matchHtml(`🧬 DNA-Match ${season}`, cur, false)}
      ${matchHtml('🏛️ Historisches Match (ab 2016)', hist, true)}
    </div>
    <div class="page-sub" style="margin-top:10px;font-size:11px">Klick auf ein Match legt es zum Vergleich ins Radar (max. 3 Profile). Match-Score = 100 − Ø Perzentil-Abstand. Quelle: nflverse (Stats, Next Gen Stats, Snap Counts).</div>`;
  _dnaDrawChart(entries, cats);
}

function _dnaDrawChart(entries, cats) {
  if (_dnaChart) { _dnaChart.destroy(); _dnaChart = null; }
  const canvas = document.getElementById('dnaCanvas');
  if (!canvas || typeof Chart === 'undefined') return;
  const st = getComputedStyle(document.body);
  const text = st.getPropertyValue('--text').trim() || '#333';
  const border = st.getPropertyValue('--border').trim() || '#ddd';
  const compare = entries.length > 1;
  _dnaChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: cats.map(c => c.label),
      datasets: entries.map((e, i) => ({
        label: `${e.p.n} ${e.season}`,
        data: e.p.p.map(v => v == null ? null : v),
        borderColor: DNA_COLORS[i],
        backgroundColor: _hexToRgbaShared(DNA_COLORS[i], compare ? 0.12 : 0.25),
        pointBackgroundColor: DNA_COLORS[i],
        pointRadius: 4, pointHoverRadius: 6, borderWidth: 2.5, spanGaps: true,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: true, aspectRatio: 1.15,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: st.getPropertyValue('--surface2').trim(), borderColor: border, borderWidth: 1,
          titleColor: text, bodyColor: text, padding: 10,
          callbacks: {
            label: c => {
              const e = entries[c.datasetIndex], cat = cats[c.dataIndex];
              const p = e.p.p[c.dataIndex];
              return `${e.p.n} ${e.season}: ${p == null ? 'kein Wert' : p + '. Perzentil'} (${_dnaFmt(e.p.v[c.dataIndex], cat)} ${cat.unit})`;
            },
          },
        },
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { display: false, stepSize: 25 },
          grid: { color: border }, angleLines: { color: border },
          pointLabels: { color: text, font: { size: 11, weight: '700' } },
        },
      },
    },
  });
}

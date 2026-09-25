// ============================================================
//  TRADES & PICKS — automatisch aus Sleeper
// ============================================================
//  AUTO-GENERIERT von scripts/sync-sleeper.js (GitHub Action
//  ".github/workflows/sync-sleeper.yml"). Nicht von Hand editieren --
//  Aenderungen werden beim naechsten Sync ueberschrieben.
//  TRADES: alle abgeschlossenen Trades der Saison (neueste zuerst).
//  TRADED_PICKS_CURRENT: getradete Picks des NOCH NICHT gelaufenen Rookie Drafts.
//  FUTURE_PICKS: nur Picks, die den Besitzer gewechselt haben ("from" =
//  urspruengliches Team, "owner" = aktueller Besitzer). Rest = "Own".
// ============================================================

const TRADES = [
 {
  "date": "2026-09-25",
  "week": 3,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "2028 3rd (via Berlin Lightning Sloths)",
   "2027 2nd (via Husum Husos)"
  ],
  "teamB": "Berlin Lightning Sloths",
  "teamBGives": [
   "2029 1st"
  ],
  "id": "1408996026093752320"
 },
 {
  "date": "2026-09-24",
  "week": 3,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "Jameson Williams"
  ],
  "teamB": "Berlin Lightning Sloths",
  "teamBGives": [
   "2028 1st"
  ],
  "id": "1408867967244017664"
 },
 {
  "date": "2026-09-24",
  "week": 3,
  "teamA": "UnicornsRuegen",
  "teamAGives": [
   "Marvin Harrison Jr."
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Tre' Harris"
  ],
  "id": "1408735230658965504"
 },
 {
  "date": "2026-09-16",
  "week": 2,
  "teamA": "Husum Husos",
  "teamAGives": [
   "Braelon Allen"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "2028 2nd",
   "2028 3rd"
  ],
  "id": "1406011762783911936"
 },
 {
  "date": "2026-09-09",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "Alvin Kamara",
   "2027 4th",
   "2027 3rd (via AngryDucks)"
  ],
  "teamB": "RioRainRats",
  "teamBGives": [
   "Josh Jacobs"
  ],
  "id": "1403347087965294592"
 },
 {
  "date": "2026-08-24",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "Elijah Sarratt"
  ],
  "teamB": "Berlin Lightning Sloths",
  "teamBGives": [
   "Tyrone Tracy Jr."
  ],
  "id": "1397598324709691392"
 },
 {
  "date": "2026-08-20",
  "week": 1,
  "teamA": "Berlin Lightning Sloths",
  "teamAGives": [
   "Tre' Harris"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Jordan Love"
  ],
  "id": "1396217699041832960"
 },
 {
  "date": "2026-08-09",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "David Njoku",
   "2028 3rd"
  ],
  "teamB": "RioRainRats",
  "teamBGives": [
   "Blake Corum"
  ],
  "id": "1392106370274189312"
 },
 {
  "date": "2026-08-06",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "Brian Thomas Jr."
  ],
  "teamB": "dseinn",
  "teamBGives": [
   "Cam Skattebo"
  ],
  "id": "1391170756586516480"
 },
 {
  "date": "2026-08-03",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "Kyren Williams",
   "2027 3rd"
  ],
  "teamB": "UnicornsRuegen",
  "teamBGives": [
   "2027 1st"
  ],
  "id": "1389692651925680128"
 },
 {
  "date": "2026-08-02",
  "week": 1,
  "teamA": "dseinn",
  "teamAGives": [
   "2027 1st (via Blowout Arctic Yetis)",
   "2027 3rd",
   "2028 1st",
   "2028 3rd",
   "2027 1st (via Husum Husos)"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Jahmyr Gibbs"
  ],
  "id": "1389245046783483904"
 },
 {
  "date": "2026-08-02",
  "week": 1,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "Trey McBride",
   "2027 4th"
  ],
  "teamB": "Berlin Lightning Sloths",
  "teamBGives": [
   "2027 1st",
   "2028 3rd"
  ],
  "id": "1389532434269208576"
 },
 {
  "date": "2026-05-02",
  "week": 1,
  "teamA": "UnicornsRuegen",
  "teamAGives": [
   "2026 4th (via San José Salamancas)",
   "2026 4th (via Blowout Arctic Yetis)",
   "2026 4th (via RioRainRats)"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "2027 3rd (via Blowout Arctic Yetis)"
  ],
  "id": "1356301380108718080"
 },
 {
  "date": "2026-05-02",
  "week": 1,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "2026 2nd",
   "2026 4th"
  ],
  "teamB": "UnicornsRuegen",
  "teamBGives": [
   "2027 2nd"
  ],
  "id": "1356295376444874752"
 },
 {
  "date": "2026-05-02",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "David Montgomery",
   "2026 2nd"
  ],
  "teamB": "AngryDucks",
  "teamBGives": [
   "2027 1st",
   "2027 3rd"
  ],
  "id": "1356222645875507200"
 },
 {
  "date": "2026-05-02",
  "week": 1,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "2026 1st (via dseinn)"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "2027 1st (via danfre)",
   "2028 1st",
   "2027 2nd (via Husum Husos)"
  ],
  "id": "1356182525688442880"
 },
 {
  "date": "2026-05-01",
  "week": 1,
  "teamA": "Berlin Lightning Sloths",
  "teamAGives": [
   "2026 2nd (via San José Salamancas)"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Troy Franklin"
  ],
  "id": "1355962797128683520"
 },
 {
  "date": "2026-04-30",
  "week": 1,
  "teamA": "dseinn",
  "teamAGives": [
   "2027 2nd"
  ],
  "teamB": "danfre",
  "teamBGives": [
   "Bryce Young"
  ],
  "id": "1355683582776971264"
 },
 {
  "date": "2026-04-23",
  "week": 1,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "Bijan Robinson",
   "2027 1st"
  ],
  "teamB": "dseinn",
  "teamBGives": [
   "2027 2nd (via danfre)",
   "2027 2nd (via San José Salamancas)",
   "2026 1st",
   "2027 1st"
  ],
  "id": "1353110673692856320"
 },
 {
  "date": "2026-04-15",
  "week": 1,
  "teamA": "Tokyo Titi Twisters",
  "teamAGives": [
   "2026 1st (via San José Salamancas)",
   "2026 3rd (via SvenNYG)"
  ],
  "teamB": "Tempelhof Thunder Turtles",
  "teamBGives": [
   "2027 1st"
  ],
  "id": "1350175588836458496"
 },
 {
  "date": "2026-03-16",
  "week": 1,
  "teamA": "Husum Husos",
  "teamAGives": [
   "2026 2nd",
   "2027 2nd"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Chuba Hubbard",
   "Tyler Allgeier",
   "Jonathon Brooks"
  ],
  "id": "1339227829665038336"
 },
 {
  "date": "2026-03-14",
  "week": 1,
  "teamA": "South Steglitz Sharknados",
  "teamAGives": [
   "2026 1st (via Tokyo Titi Twisters)",
   "2027 2nd"
  ],
  "teamB": "Tempelhof Thunder Turtles",
  "teamBGives": [
   "Lamar Jackson"
  ],
  "id": "1338471042900832256"
 },
 {
  "date": "2026-03-13",
  "week": 1,
  "teamA": "Blowout Arctic Yetis",
  "teamAGives": [
   "Xavier Legette",
   "Tre' Harris"
  ],
  "teamB": "Berlin Lightning Sloths",
  "teamBGives": [
   "2026 3rd"
  ],
  "id": "1338175269302714368"
 },
 {
  "date": "2026-03-04",
  "week": 1,
  "teamA": "RioRainRats",
  "teamAGives": [
   "2026 1st",
   "2026 4th"
  ],
  "teamB": "San José Salamancas",
  "teamBGives": [
   "Josh Jacobs",
   "Malik Willis"
  ],
  "id": "1334848466915950592"
 }
];

const TRADED_PICKS_CURRENT = [];

const FUTURE_PICKS = {
 "2027": [
  {
   "round": "1st",
   "from": "AngryDucks",
   "owner": "Tokyo Titi Twisters"
  },
  {
   "round": "1st",
   "from": "Berlin Lightning Sloths",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "1st",
   "from": "Blowout Arctic Yetis",
   "owner": "San José Salamancas"
  },
  {
   "round": "1st",
   "from": "danfre",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "1st",
   "from": "dseinn",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "1st",
   "from": "Husum Husos",
   "owner": "San José Salamancas"
  },
  {
   "round": "1st",
   "from": "RioRainRats",
   "owner": "San José Salamancas"
  },
  {
   "round": "1st",
   "from": "Tempelhof Thunder Turtles",
   "owner": "Tokyo Titi Twisters"
  },
  {
   "round": "1st",
   "from": "UnicornsRuegen",
   "owner": "Tokyo Titi Twisters"
  },
  {
   "round": "2nd",
   "from": "danfre",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "2nd",
   "from": "dseinn",
   "owner": "danfre"
  },
  {
   "round": "2nd",
   "from": "Husum Husos",
   "owner": "Berlin Lightning Sloths"
  },
  {
   "round": "2nd",
   "from": "San José Salamancas",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "2nd",
   "from": "South Steglitz Sharknados",
   "owner": "Tempelhof Thunder Turtles"
  },
  {
   "round": "2nd",
   "from": "UnicornsRuegen",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "3rd",
   "from": "AngryDucks",
   "owner": "RioRainRats"
  },
  {
   "round": "3rd",
   "from": "Blowout Arctic Yetis",
   "owner": "UnicornsRuegen"
  },
  {
   "round": "3rd",
   "from": "dseinn",
   "owner": "San José Salamancas"
  },
  {
   "round": "3rd",
   "from": "San José Salamancas",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "3rd",
   "from": "Tokyo Titi Twisters",
   "owner": "UnicornsRuegen"
  },
  {
   "round": "4th",
   "from": "Blowout Arctic Yetis",
   "owner": "Berlin Lightning Sloths"
  },
  {
   "round": "4th",
   "from": "RioRainRats",
   "owner": "San José Salamancas"
  },
  {
   "round": "4th",
   "from": "San José Salamancas",
   "owner": "danfre"
  },
  {
   "round": "4th",
   "from": "Tokyo Titi Twisters",
   "owner": "RioRainRats"
  }
 ],
 "2028": [
  {
   "round": "1st",
   "from": "Berlin Lightning Sloths",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "1st",
   "from": "dseinn",
   "owner": "San José Salamancas"
  },
  {
   "round": "1st",
   "from": "San José Salamancas",
   "owner": "Blowout Arctic Yetis"
  },
  {
   "round": "2nd",
   "from": "San José Salamancas",
   "owner": "Husum Husos"
  },
  {
   "round": "3rd",
   "from": "dseinn",
   "owner": "San José Salamancas"
  },
  {
   "round": "3rd",
   "from": "San José Salamancas",
   "owner": "Husum Husos"
  },
  {
   "round": "3rd",
   "from": "Tokyo Titi Twisters",
   "owner": "RioRainRats"
  }
 ],
 "2029": [
  {
   "round": "1st",
   "from": "Berlin Lightning Sloths",
   "owner": "Blowout Arctic Yetis"
  }
 ]
};

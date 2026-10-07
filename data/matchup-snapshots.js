// ============================================================
//  MATCHUP_SNAPSHOTS — serverseitig gesicherte Vorab-Projektionen
// ============================================================
//  AUTO-GENERIERT von scripts/snapshot-projections.js über die GitHub
//  Action ".github/workflows/snapshot-projections.yml". Nicht von Hand
//  editieren — läuft automatisch einmal pro Woche (Mittwoch) und
//  schreibt NUR neue, noch nicht gespielte Wochen dazu. Einmal gesetzte
//  Einträge werden nie überschrieben, damit sie eine echte "vorher"-
//  Momentaufnahme bleiben.
//  Zuletzt synchronisiert: 2026-10-07T16:18:09.534Z
//
//  Struktur: MATCHUP_SNAPSHOTS[season][week][teamId] = {
//    capturedAt, lineup, mode, teamMean, starters: [{slot,name,pos,mean}]
//  }
//
//  Fallback: bevor der erste Lauf passiert ist (oder für Wochen, die er
//  noch nicht erreicht hat), nutzt die Seite ergänzend lokale Snapshots
//  aus dem Browser-localStorage (siehe js/app.js, loadMatchupSnapshot).
// ============================================================

const MATCHUP_SNAPSHOTS = {
 "2026": {
  "4": {
   "svennyg": {
    "capturedAt": "2026-09-30T14:41:53.282Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 110.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Dak Prescott",
      "pos": "QB",
      "mean": 19.6
     },
     {
      "slot": "RB",
      "name": "Bucky Irving",
      "pos": "RB",
      "mean": 12.7
     },
     {
      "slot": "RB",
      "name": "Omarion Hampton",
      "pos": "RB",
      "mean": 12.4
     },
     {
      "slot": "WR",
      "name": "Josh Downs",
      "pos": "WR",
      "mean": 10.5
     },
     {
      "slot": "WR",
      "name": "Devaughn Vele",
      "pos": "WR",
      "mean": 9.6
     },
     {
      "slot": "WR",
      "name": "Keenan Allen",
      "pos": "WR",
      "mean": 8
     },
     {
      "slot": "TE",
      "name": "Cade Otton",
      "pos": "TE",
      "mean": 7.4
     },
     {
      "slot": "FLEX",
      "name": "Rashod Bateman",
      "pos": "WR",
      "mean": 7.6
     },
     {
      "slot": "FLEX",
      "name": "Jadarian Price",
      "pos": "RB",
      "mean": 7.3
     },
     {
      "slot": "K",
      "name": "Jason Myers",
      "pos": "K",
      "mean": 7
     },
     {
      "slot": "DST",
      "name": "Jaguars D/ST",
      "pos": "D/ST",
      "mean": 8.5
     }
    ]
   },
   "jiggydee2312": {
    "capturedAt": "2026-09-30T14:41:53.282Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 95.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Drake Maye",
      "pos": "QB",
      "mean": 14
     },
     {
      "slot": "RB",
      "name": "Bhayshul Tuten",
      "pos": "RB",
      "mean": 12
     },
     {
      "slot": "RB",
      "name": "Chris Rodriguez Jr.",
      "pos": "RB",
      "mean": 6.1
     },
     {
      "slot": "WR",
      "name": "Jameson Williams",
      "pos": "WR",
      "mean": 9.8
     },
     {
      "slot": "WR",
      "name": "Michael Pittman Jr.",
      "pos": "WR",
      "mean": 8.5
     },
     {
      "slot": "WR",
      "name": "Rashid Shaheed",
      "pos": "WR",
      "mean": 6
     },
     {
      "slot": "TE",
      "name": "Trey McBride",
      "pos": "TE",
      "mean": 16.8
     },
     {
      "slot": "FLEX",
      "name": "Kenyon Sadiq",
      "pos": "TE",
      "mean": 9.4
     },
     {
      "slot": "FLEX",
      "name": "Oronde Gadsden II",
      "pos": "TE",
      "mean": 6.7
     },
     {
      "slot": "K",
      "name": "Jake Bates",
      "pos": "K",
      "mean": 6.5
     },
     {
      "slot": "DST",
      "name": null,
      "pos": null,
      "mean": null
     }
    ]
   },
   "milchreis": {
    "capturedAt": "2026-09-30T14:41:53.283Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 131.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Kirk Cousins",
      "pos": "QB",
      "mean": 11
     },
     {
      "slot": "RB",
      "name": "Cam Skattebo",
      "pos": "RB",
      "mean": 12
     },
     {
      "slot": "RB",
      "name": "Blake Corum",
      "pos": "RB",
      "mean": 7.2
     },
     {
      "slot": "WR",
      "name": "Jaxon Smith-Njigba",
      "pos": "WR",
      "mean": 25.7
     },
     {
      "slot": "WR",
      "name": "Rashee Rice",
      "pos": "WR",
      "mean": 13.1
     },
     {
      "slot": "WR",
      "name": "Luther Burden III",
      "pos": "WR",
      "mean": 12.1
     },
     {
      "slot": "TE",
      "name": "Brock Bowers",
      "pos": "TE",
      "mean": 16.9
     },
     {
      "slot": "FLEX",
      "name": "Emeka Egbuka",
      "pos": "WR",
      "mean": 12.1
     },
     {
      "slot": "FLEX",
      "name": "Colston Loveland",
      "pos": "TE",
      "mean": 7.7
     },
     {
      "slot": "K",
      "name": "Eddy Pineiro",
      "pos": "K",
      "mean": 6.4
     },
     {
      "slot": "DST",
      "name": "Broncos D/ST",
      "pos": "D/ST",
      "mean": 7
     }
    ]
   },
   "danfre": {
    "capturedAt": "2026-09-30T14:41:53.283Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 130.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Tyler Shough",
      "pos": "QB",
      "mean": 20
     },
     {
      "slot": "RB",
      "name": "Jonathan Taylor",
      "pos": "RB",
      "mean": 18.6
     },
     {
      "slot": "RB",
      "name": "Christian McCaffrey",
      "pos": "RB",
      "mean": 18.2
     },
     {
      "slot": "WR",
      "name": "Michael Wilson",
      "pos": "WR",
      "mean": 11.6
     },
     {
      "slot": "WR",
      "name": "Terry McLaurin",
      "pos": "WR",
      "mean": 11.3
     },
     {
      "slot": "WR",
      "name": "Courtland Sutton",
      "pos": "WR",
      "mean": 7.8
     },
     {
      "slot": "TE",
      "name": "Sam LaPorta",
      "pos": "TE",
      "mean": 11.5
     },
     {
      "slot": "FLEX",
      "name": "Chase Brown",
      "pos": "RB",
      "mean": 14
     },
     {
      "slot": "FLEX",
      "name": "Kyle Pitts Sr.",
      "pos": "TE",
      "mean": 5.7
     },
     {
      "slot": "K",
      "name": "Cameron Dicker",
      "pos": "K",
      "mean": 5
     },
     {
      "slot": "DST",
      "name": "Chiefs D/ST",
      "pos": "D/ST",
      "mean": 6.4
     }
    ]
   },
   "bomba12": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 138.9,
    "starters": [
     {
      "slot": "QB",
      "name": "Patrick Mahomes II",
      "pos": "QB",
      "mean": 19.9
     },
     {
      "slot": "RB",
      "name": "Javonte Williams",
      "pos": "RB",
      "mean": 14.7
     },
     {
      "slot": "RB",
      "name": "Quinshon Judkins",
      "pos": "RB",
      "mean": 10.2
     },
     {
      "slot": "WR",
      "name": "Amon-Ra St. Brown",
      "pos": "WR",
      "mean": 20.9
     },
     {
      "slot": "WR",
      "name": "Christian Watson",
      "pos": "WR",
      "mean": 17.7
     },
     {
      "slot": "WR",
      "name": "Tee Higgins",
      "pos": "WR",
      "mean": 14
     },
     {
      "slot": "TE",
      "name": "Tucker Kraft",
      "pos": "TE",
      "mean": 8.4
     },
     {
      "slot": "FLEX",
      "name": "Tetairoa McMillan",
      "pos": "WR",
      "mean": 11.4
     },
     {
      "slot": "FLEX",
      "name": "KC Concepcion",
      "pos": "WR",
      "mean": 7.8
     },
     {
      "slot": "K",
      "name": "Brandon Aubrey",
      "pos": "K",
      "mean": 8
     },
     {
      "slot": "DST",
      "name": "Texans D/ST",
      "pos": "D/ST",
      "mean": 6.1
     }
    ]
   },
   "dickvanhurik": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 146.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Lamar Jackson",
      "pos": "QB",
      "mean": 19.8
     },
     {
      "slot": "RB",
      "name": "Kenneth Walker III",
      "pos": "RB",
      "mean": 20.4
     },
     {
      "slot": "RB",
      "name": "Kyren Williams",
      "pos": "RB",
      "mean": 15
     },
     {
      "slot": "WR",
      "name": "CeeDee Lamb",
      "pos": "WR",
      "mean": 19.8
     },
     {
      "slot": "WR",
      "name": "Ja'Marr Chase",
      "pos": "WR",
      "mean": 18.2
     },
     {
      "slot": "WR",
      "name": "DJ Moore",
      "pos": "WR",
      "mean": 10.9
     },
     {
      "slot": "TE",
      "name": "Dalton Kincaid",
      "pos": "TE",
      "mean": 12.2
     },
     {
      "slot": "FLEX",
      "name": "Tony Pollard",
      "pos": "RB",
      "mean": 9
     },
     {
      "slot": "FLEX",
      "name": "Dontayvion Wicks",
      "pos": "WR",
      "mean": 7.6
     },
     {
      "slot": "K",
      "name": "Cam Little",
      "pos": "K",
      "mean": 7
     },
     {
      "slot": "DST",
      "name": "Seahawks D/ST",
      "pos": "D/ST",
      "mean": 6.9
     }
    ]
   },
   "americagrizlies": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 114.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Josh Allen",
      "pos": "QB",
      "mean": 26.6
     },
     {
      "slot": "RB",
      "name": "Saquon Barkley",
      "pos": "RB",
      "mean": 10.8
     },
     {
      "slot": "RB",
      "name": "TreVeyon Henderson",
      "pos": "RB",
      "mean": 9.5
     },
     {
      "slot": "WR",
      "name": "Justin Jefferson",
      "pos": "WR",
      "mean": 14.8
     },
     {
      "slot": "WR",
      "name": "Mike Evans",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "WR",
      "name": "Romeo Doubs",
      "pos": "WR",
      "mean": 8.2
     },
     {
      "slot": "TE",
      "name": "Hunter Henry",
      "pos": "TE",
      "mean": 6.9
     },
     {
      "slot": "FLEX",
      "name": "DeMario Douglas",
      "pos": "WR",
      "mean": 4.6
     },
     {
      "slot": "FLEX",
      "name": "Samaje Perine",
      "pos": "RB",
      "mean": 4.3
     },
     {
      "slot": "K",
      "name": "Andy Borregales",
      "pos": "K",
      "mean": 6
     },
     {
      "slot": "DST",
      "name": "Vikings D/ST",
      "pos": "D/ST",
      "mean": 10.2
     }
    ]
   },
   "angryducks": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 130.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Bo Nix",
      "pos": "QB",
      "mean": 16.5
     },
     {
      "slot": "RB",
      "name": "David Montgomery",
      "pos": "RB",
      "mean": 12.7
     },
     {
      "slot": "RB",
      "name": "Aaron Jones Sr.",
      "pos": "RB",
      "mean": 9.8
     },
     {
      "slot": "WR",
      "name": "Zay Flowers",
      "pos": "WR",
      "mean": 16.3
     },
     {
      "slot": "WR",
      "name": "Drake London",
      "pos": "WR",
      "mean": 14.5
     },
     {
      "slot": "WR",
      "name": "Ladd McConkey",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "TE",
      "name": "Tyler Warren",
      "pos": "TE",
      "mean": 12.5
     },
     {
      "slot": "FLEX",
      "name": "Malik Nabers",
      "pos": "WR",
      "mean": 10.6
     },
     {
      "slot": "FLEX",
      "name": "Chris Godwin Jr.",
      "pos": "WR",
      "mean": 8.9
     },
     {
      "slot": "K",
      "name": "Cairo Santos",
      "pos": "K",
      "mean": 7.2
     },
     {
      "slot": "DST",
      "name": "Steelers D/ST",
      "pos": "D/ST",
      "mean": 8.4
     }
    ]
   },
   "giantmarv": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 120.5,
    "starters": [
     {
      "slot": "QB",
      "name": "C.J. Stroud",
      "pos": "QB",
      "mean": 14.8
     },
     {
      "slot": "RB",
      "name": "James Cook III",
      "pos": "RB",
      "mean": 16
     },
     {
      "slot": "RB",
      "name": "Jonah Coleman",
      "pos": "RB",
      "mean": 4.3
     },
     {
      "slot": "WR",
      "name": "DeVonta Smith",
      "pos": "WR",
      "mean": 14.8
     },
     {
      "slot": "WR",
      "name": "George Pickens",
      "pos": "WR",
      "mean": 12.4
     },
     {
      "slot": "WR",
      "name": "Khalil Shakir",
      "pos": "WR",
      "mean": 7.9
     },
     {
      "slot": "TE",
      "name": "Travis Kelce",
      "pos": "TE",
      "mean": 13.2
     },
     {
      "slot": "FLEX",
      "name": "George Kittle",
      "pos": "TE",
      "mean": 12.9
     },
     {
      "slot": "FLEX",
      "name": "Jake Ferguson",
      "pos": "TE",
      "mean": 10.1
     },
     {
      "slot": "K",
      "name": "Chase McLaughlin",
      "pos": "K",
      "mean": 9.5
     },
     {
      "slot": "DST",
      "name": "Browns D/ST",
      "pos": "D/ST",
      "mean": 4.5
     }
    ]
   },
   "r4xon": {
    "capturedAt": "2026-09-30T14:41:53.284Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 138.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Brock Purdy",
      "pos": "QB",
      "mean": 22.6
     },
     {
      "slot": "RB",
      "name": "Ashton Jeanty",
      "pos": "RB",
      "mean": 16.7
     },
     {
      "slot": "RB",
      "name": "Chuba Hubbard",
      "pos": "RB",
      "mean": 13.2
     },
     {
      "slot": "WR",
      "name": "Garrett Wilson",
      "pos": "WR",
      "mean": 16.2
     },
     {
      "slot": "WR",
      "name": "Parker Washington",
      "pos": "WR",
      "mean": 14.4
     },
     {
      "slot": "WR",
      "name": "DK Metcalf",
      "pos": "WR",
      "mean": 9.9
     },
     {
      "slot": "TE",
      "name": "Juwan Johnson",
      "pos": "TE",
      "mean": 12.2
     },
     {
      "slot": "FLEX",
      "name": "Jaylen Warren",
      "pos": "RB",
      "mean": 11.8
     },
     {
      "slot": "FLEX",
      "name": "AJ Barner",
      "pos": "TE",
      "mean": 8
     },
     {
      "slot": "K",
      "name": "Chris Boswell",
      "pos": "K",
      "mean": 7.2
     },
     {
      "slot": "DST",
      "name": "Rams D/ST",
      "pos": "D/ST",
      "mean": 6.1
     }
    ]
   },
   "teambeermode": {
    "capturedAt": "2026-09-30T14:41:53.285Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 128.7,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Hurts",
      "pos": "QB",
      "mean": 18.5
     },
     {
      "slot": "RB",
      "name": "Derrick Henry",
      "pos": "RB",
      "mean": 19.7
     },
     {
      "slot": "RB",
      "name": "Alvin Kamara",
      "pos": "RB",
      "mean": 4.7
     },
     {
      "slot": "WR",
      "name": "Chris Olave",
      "pos": "WR",
      "mean": 18.7
     },
     {
      "slot": "WR",
      "name": "Davante Adams",
      "pos": "WR",
      "mean": 16.6
     },
     {
      "slot": "WR",
      "name": "Stefon Diggs",
      "pos": "WR",
      "mean": 12
     },
     {
      "slot": "TE",
      "name": "Mike Gesicki",
      "pos": "TE",
      "mean": 8.3
     },
     {
      "slot": "FLEX",
      "name": "Deebo Samuel Sr.",
      "pos": "WR",
      "mean": 11.2
     },
     {
      "slot": "FLEX",
      "name": "Jordan Addison",
      "pos": "WR",
      "mean": 9.1
     },
     {
      "slot": "K",
      "name": "Ka'imi Fairbairn",
      "pos": "K",
      "mean": 6.5
     },
     {
      "slot": "DST",
      "name": "Packers D/ST",
      "pos": "D/ST",
      "mean": 3.2
     }
    ]
   },
   "lovethecheesehead": {
    "capturedAt": "2026-09-30T14:41:53.285Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 33.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Milroe",
      "pos": "QB",
      "mean": 0.6
     },
     {
      "slot": "RB",
      "name": "Nicholas Singleton",
      "pos": "RB",
      "mean": 2.4
     },
     {
      "slot": "RB",
      "name": "Sean Tucker",
      "pos": "RB",
      "mean": 1.9
     },
     {
      "slot": "WR",
      "name": "Elic Ayomanor",
      "pos": "WR",
      "mean": 4.9
     },
     {
      "slot": "WR",
      "name": "Chris Bell",
      "pos": "WR",
      "mean": 4.3
     },
     {
      "slot": "WR",
      "name": "Travis Hunter",
      "pos": "WR",
      "mean": 3.2
     },
     {
      "slot": "TE",
      "name": "Evan Engram",
      "pos": "TE",
      "mean": 4.9
     },
     {
      "slot": "FLEX",
      "name": "Cyrus Allen",
      "pos": "WR",
      "mean": 2.8
     },
     {
      "slot": "FLEX",
      "name": "Kevin Coleman Jr.",
      "pos": "WR",
      "mean": 1.2
     },
     {
      "slot": "K",
      "name": "Trey Smack",
      "pos": "K",
      "mean": 5.5
     },
     {
      "slot": "DST",
      "name": "Dolphins D/ST",
      "pos": "D/ST",
      "mean": 2.2
     }
    ]
   },
   "dseinn": {
    "capturedAt": "2026-09-30T14:41:53.285Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 149.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Bryce Young",
      "pos": "QB",
      "mean": 18.8
     },
     {
      "slot": "RB",
      "name": "Jahmyr Gibbs",
      "pos": "RB",
      "mean": 26.1
     },
     {
      "slot": "RB",
      "name": "Bijan Robinson",
      "pos": "RB",
      "mean": 22.5
     },
     {
      "slot": "WR",
      "name": "Jalen Coker",
      "pos": "WR",
      "mean": 13.6
     },
     {
      "slot": "WR",
      "name": "Jaylen Waddle",
      "pos": "WR",
      "mean": 11.4
     },
     {
      "slot": "WR",
      "name": "Brian Thomas Jr.",
      "pos": "WR",
      "mean": 8.4
     },
     {
      "slot": "TE",
      "name": "Dalton Schultz",
      "pos": "TE",
      "mean": 11
     },
     {
      "slot": "FLEX",
      "name": "D'Andre Swift",
      "pos": "RB",
      "mean": 15.5
     },
     {
      "slot": "FLEX",
      "name": "Quentin Johnston",
      "pos": "WR",
      "mean": 7
     },
     {
      "slot": "K",
      "name": "Harrison Butker",
      "pos": "K",
      "mean": 7.5
     },
     {
      "slot": "DST",
      "name": "Panthers D/ST",
      "pos": "D/ST",
      "mean": 7.5
     }
    ]
   },
   "unicornsruegen": {
    "capturedAt": "2026-09-30T14:41:53.285Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 90.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Trevor Lawrence",
      "pos": "QB",
      "mean": 17.9
     },
     {
      "slot": "RB",
      "name": "Jacory Croskey-Merritt",
      "pos": "RB",
      "mean": 7.7
     },
     {
      "slot": "RB",
      "name": "Woody Marks",
      "pos": "RB",
      "mean": 6.2
     },
     {
      "slot": "WR",
      "name": "Tre Tucker",
      "pos": "WR",
      "mean": 9.7
     },
     {
      "slot": "WR",
      "name": "Carnell Tate",
      "pos": "WR",
      "mean": 9.4
     },
     {
      "slot": "WR",
      "name": "Xavier Worthy",
      "pos": "WR",
      "mean": 8.5
     },
     {
      "slot": "TE",
      "name": "T.J. Hockenson",
      "pos": "TE",
      "mean": 8.3
     },
     {
      "slot": "FLEX",
      "name": "Malik Washington",
      "pos": "WR",
      "mean": 8.2
     },
     {
      "slot": "FLEX",
      "name": "Brenton Strange",
      "pos": "TE",
      "mean": 8.1
     },
     {
      "slot": "K",
      "name": "Nick Folk",
      "pos": "K",
      "mean": 6.2
     },
     {
      "slot": "DST",
      "name": null,
      "pos": null,
      "mean": null
     }
    ]
   }
  },
  "5": {
   "milchreis": {
    "capturedAt": "2026-10-07T16:18:09.526Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 126.5,
    "starters": [
     {
      "slot": "QB",
      "name": "Kirk Cousins",
      "pos": "QB",
      "mean": 12.8
     },
     {
      "slot": "RB",
      "name": "Cam Skattebo",
      "pos": "RB",
      "mean": 11.4
     },
     {
      "slot": "RB",
      "name": "Blake Corum",
      "pos": "RB",
      "mean": 6.6
     },
     {
      "slot": "WR",
      "name": "Jaxon Smith-Njigba",
      "pos": "WR",
      "mean": 23.8
     },
     {
      "slot": "WR",
      "name": "Luther Burden III",
      "pos": "WR",
      "mean": 12
     },
     {
      "slot": "WR",
      "name": "Emeka Egbuka",
      "pos": "WR",
      "mean": 10.8
     },
     {
      "slot": "TE",
      "name": "Brock Bowers",
      "pos": "TE",
      "mean": 17.6
     },
     {
      "slot": "FLEX",
      "name": "Rome Odunze",
      "pos": "WR",
      "mean": 10.6
     },
     {
      "slot": "FLEX",
      "name": "Colston Loveland",
      "pos": "TE",
      "mean": 8.3
     },
     {
      "slot": "K",
      "name": "Eddy Pineiro",
      "pos": "K",
      "mean": 6.2
     },
     {
      "slot": "DST",
      "name": "Broncos D/ST",
      "pos": "D/ST",
      "mean": 6.4
     }
    ]
   },
   "jiggydee2312": {
    "capturedAt": "2026-10-07T16:18:09.527Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 105.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Drake Maye",
      "pos": "QB",
      "mean": 15.9
     },
     {
      "slot": "RB",
      "name": "Bhayshul Tuten",
      "pos": "RB",
      "mean": 11.8
     },
     {
      "slot": "RB",
      "name": "Chris Rodriguez Jr.",
      "pos": "RB",
      "mean": 6.6
     },
     {
      "slot": "WR",
      "name": "Jameson Williams",
      "pos": "WR",
      "mean": 10.8
     },
     {
      "slot": "WR",
      "name": "Kalif Raymond",
      "pos": "WR",
      "mean": 7.7
     },
     {
      "slot": "WR",
      "name": "Michael Pittman Jr.",
      "pos": "WR",
      "mean": 7.7
     },
     {
      "slot": "TE",
      "name": "Trey McBride",
      "pos": "TE",
      "mean": 15.8
     },
     {
      "slot": "FLEX",
      "name": "Kenyon Sadiq",
      "pos": "TE",
      "mean": 8
     },
     {
      "slot": "FLEX",
      "name": "Cooper Kupp",
      "pos": "WR",
      "mean": 5.9
     },
     {
      "slot": "K",
      "name": "Jake Bates",
      "pos": "K",
      "mean": 8.1
     },
     {
      "slot": "DST",
      "name": "Bears D/ST",
      "pos": "D/ST",
      "mean": 6.9
     }
    ]
   },
   "bomba12": {
    "capturedAt": "2026-10-07T16:18:09.527Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 148.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Patrick Mahomes II",
      "pos": "QB",
      "mean": 19.5
     },
     {
      "slot": "RB",
      "name": "Javonte Williams",
      "pos": "RB",
      "mean": 17
     },
     {
      "slot": "RB",
      "name": "Quinshon Judkins",
      "pos": "RB",
      "mean": 11.8
     },
     {
      "slot": "WR",
      "name": "Amon-Ra St. Brown",
      "pos": "WR",
      "mean": 20.1
     },
     {
      "slot": "WR",
      "name": "Tetairoa McMillan",
      "pos": "WR",
      "mean": 16.3
     },
     {
      "slot": "WR",
      "name": "Christian Watson",
      "pos": "WR",
      "mean": 16.2
     },
     {
      "slot": "TE",
      "name": "Tucker Kraft",
      "pos": "TE",
      "mean": 9.6
     },
     {
      "slot": "FLEX",
      "name": "Tee Higgins",
      "pos": "WR",
      "mean": 15.8
     },
     {
      "slot": "FLEX",
      "name": "KC Concepcion",
      "pos": "WR",
      "mean": 8.3
     },
     {
      "slot": "K",
      "name": "Brandon Aubrey",
      "pos": "K",
      "mean": 8.3
     },
     {
      "slot": "DST",
      "name": "Texans D/ST",
      "pos": "D/ST",
      "mean": 5.8
     }
    ]
   },
   "svennyg": {
    "capturedAt": "2026-10-07T16:18:09.527Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 104.7,
    "starters": [
     {
      "slot": "QB",
      "name": "Dak Prescott",
      "pos": "QB",
      "mean": 19.4
     },
     {
      "slot": "RB",
      "name": "Omarion Hampton",
      "pos": "RB",
      "mean": 12.5
     },
     {
      "slot": "RB",
      "name": "Bucky Irving",
      "pos": "RB",
      "mean": 11.7
     },
     {
      "slot": "WR",
      "name": "Devaughn Vele",
      "pos": "WR",
      "mean": 10.7
     },
     {
      "slot": "WR",
      "name": "Josh Downs",
      "pos": "WR",
      "mean": 9.7
     },
     {
      "slot": "WR",
      "name": "Mack Hollins",
      "pos": "WR",
      "mean": 6.6
     },
     {
      "slot": "TE",
      "name": "Cade Otton",
      "pos": "TE",
      "mean": 7.5
     },
     {
      "slot": "FLEX",
      "name": "Kenny Gainwell",
      "pos": "RB",
      "mean": 6.8
     },
     {
      "slot": "FLEX",
      "name": "Cody White",
      "pos": "WR",
      "mean": 4.7
     },
     {
      "slot": "K",
      "name": "Jason Myers",
      "pos": "K",
      "mean": 6.7
     },
     {
      "slot": "DST",
      "name": "Jaguars D/ST",
      "pos": "D/ST",
      "mean": 8.4
     }
    ]
   },
   "danfre": {
    "capturedAt": "2026-10-07T16:18:09.528Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 134.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Tyler Shough",
      "pos": "QB",
      "mean": 19.4
     },
     {
      "slot": "RB",
      "name": "Jonathan Taylor",
      "pos": "RB",
      "mean": 19.2
     },
     {
      "slot": "RB",
      "name": "Christian McCaffrey",
      "pos": "RB",
      "mean": 17.9
     },
     {
      "slot": "WR",
      "name": "Michael Wilson",
      "pos": "WR",
      "mean": 12.3
     },
     {
      "slot": "WR",
      "name": "Jakobi Meyers",
      "pos": "WR",
      "mean": 10.2
     },
     {
      "slot": "WR",
      "name": "Courtland Sutton",
      "pos": "WR",
      "mean": 6.9
     },
     {
      "slot": "TE",
      "name": "Sam LaPorta",
      "pos": "TE",
      "mean": 13.1
     },
     {
      "slot": "FLEX",
      "name": "Chase Brown",
      "pos": "RB",
      "mean": 14.7
     },
     {
      "slot": "FLEX",
      "name": "Kyle Pitts Sr.",
      "pos": "TE",
      "mean": 6
     },
     {
      "slot": "K",
      "name": "Matt Gay",
      "pos": "K",
      "mean": 8.4
     },
     {
      "slot": "DST",
      "name": "Chiefs D/ST",
      "pos": "D/ST",
      "mean": 6.1
     }
    ]
   },
   "americagrizlies": {
    "capturedAt": "2026-10-07T16:18:09.528Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 104.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Josh Allen",
      "pos": "QB",
      "mean": 25.6
     },
     {
      "slot": "RB",
      "name": "Saquon Barkley",
      "pos": "RB",
      "mean": 9.5
     },
     {
      "slot": "RB",
      "name": "TreVeyon Henderson",
      "pos": "RB",
      "mean": 8.6
     },
     {
      "slot": "WR",
      "name": "Mike Evans",
      "pos": "WR",
      "mean": 12.8
     },
     {
      "slot": "WR",
      "name": "Romeo Doubs",
      "pos": "WR",
      "mean": 10.4
     },
     {
      "slot": "WR",
      "name": "Laquon Treadwell",
      "pos": "WR",
      "mean": 6.5
     },
     {
      "slot": "TE",
      "name": "Hunter Henry",
      "pos": "TE",
      "mean": 7.5
     },
     {
      "slot": "FLEX",
      "name": "DeMario Douglas",
      "pos": "WR",
      "mean": 4.5
     },
     {
      "slot": "FLEX",
      "name": "Samaje Perine",
      "pos": "RB",
      "mean": 3.8
     },
     {
      "slot": "K",
      "name": "Andy Borregales",
      "pos": "K",
      "mean": 5.6
     },
     {
      "slot": "DST",
      "name": "Vikings D/ST",
      "pos": "D/ST",
      "mean": 10
     }
    ]
   },
   "dickvanhurik": {
    "capturedAt": "2026-10-07T16:18:09.528Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 119.3,
    "starters": [
     {
      "slot": "QB",
      "name": "Michael Penix Jr.",
      "pos": "QB",
      "mean": 10.6
     },
     {
      "slot": "RB",
      "name": "Kyren Williams",
      "pos": "RB",
      "mean": 18.1
     },
     {
      "slot": "RB",
      "name": "Tony Pollard",
      "pos": "RB",
      "mean": 9.5
     },
     {
      "slot": "WR",
      "name": "CeeDee Lamb",
      "pos": "WR",
      "mean": 22.8
     },
     {
      "slot": "WR",
      "name": "Dontayvion Wicks",
      "pos": "WR",
      "mean": 7.2
     },
     {
      "slot": "WR",
      "name": "Antonio Williams",
      "pos": "WR",
      "mean": 6.2
     },
     {
      "slot": "TE",
      "name": "Harold Fannin Jr.",
      "pos": "TE",
      "mean": 11.7
     },
     {
      "slot": "FLEX",
      "name": "Dalton Kincaid",
      "pos": "TE",
      "mean": 10.7
     },
     {
      "slot": "FLEX",
      "name": "Emanuel Wilson",
      "pos": "RB",
      "mean": 6.8
     },
     {
      "slot": "K",
      "name": "Cam Little",
      "pos": "K",
      "mean": 8
     },
     {
      "slot": "DST",
      "name": "Seahawks D/ST",
      "pos": "D/ST",
      "mean": 7.6
     }
    ]
   },
   "r4xon": {
    "capturedAt": "2026-10-07T16:18:09.528Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 139.8,
    "starters": [
     {
      "slot": "QB",
      "name": "Brock Purdy",
      "pos": "QB",
      "mean": 22.1
     },
     {
      "slot": "RB",
      "name": "Ashton Jeanty",
      "pos": "RB",
      "mean": 16.9
     },
     {
      "slot": "RB",
      "name": "Jaylen Warren",
      "pos": "RB",
      "mean": 12.3
     },
     {
      "slot": "WR",
      "name": "Puka Nacua",
      "pos": "WR",
      "mean": 19
     },
     {
      "slot": "WR",
      "name": "Garrett Wilson",
      "pos": "WR",
      "mean": 14.7
     },
     {
      "slot": "WR",
      "name": "Parker Washington",
      "pos": "WR",
      "mean": 12.7
     },
     {
      "slot": "TE",
      "name": "Juwan Johnson",
      "pos": "TE",
      "mean": 12.2
     },
     {
      "slot": "FLEX",
      "name": "DK Metcalf",
      "pos": "WR",
      "mean": 10.8
     },
     {
      "slot": "FLEX",
      "name": "Tyler Allgeier",
      "pos": "RB",
      "mean": 6.3
     },
     {
      "slot": "K",
      "name": "Chris Boswell",
      "pos": "K",
      "mean": 6.6
     },
     {
      "slot": "DST",
      "name": "Rams D/ST",
      "pos": "D/ST",
      "mean": 6.1
     }
    ]
   },
   "lovethecheesehead": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 30.6,
    "starters": [
     {
      "slot": "QB",
      "name": "Anthony Richardson Sr.",
      "pos": "QB",
      "mean": 0.5
     },
     {
      "slot": "RB",
      "name": "Nicholas Singleton",
      "pos": "RB",
      "mean": 2.1
     },
     {
      "slot": "RB",
      "name": "Devin Neal",
      "pos": "RB",
      "mean": 1.4
     },
     {
      "slot": "WR",
      "name": "Marvin Harrison Jr.",
      "pos": "WR",
      "mean": 7.5
     },
     {
      "slot": "WR",
      "name": "Elic Ayomanor",
      "pos": "WR",
      "mean": 4.6
     },
     {
      "slot": "WR",
      "name": "Travis Hunter",
      "pos": "WR",
      "mean": 2.7
     },
     {
      "slot": "TE",
      "name": "Matt Hibner",
      "pos": "TE",
      "mean": 3.4
     },
     {
      "slot": "FLEX",
      "name": null,
      "pos": null,
      "mean": null
     },
     {
      "slot": "FLEX",
      "name": null,
      "pos": null,
      "mean": null
     },
     {
      "slot": "K",
      "name": "Trey Smack",
      "pos": "K",
      "mean": 5.7
     },
     {
      "slot": "DST",
      "name": "Dolphins D/ST",
      "pos": "D/ST",
      "mean": 2.7
     }
    ]
   },
   "angryducks": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 131.1,
    "starters": [
     {
      "slot": "QB",
      "name": "Bo Nix",
      "pos": "QB",
      "mean": 16.1
     },
     {
      "slot": "RB",
      "name": "David Montgomery",
      "pos": "RB",
      "mean": 11.5
     },
     {
      "slot": "RB",
      "name": "Aaron Jones Sr.",
      "pos": "RB",
      "mean": 10.8
     },
     {
      "slot": "WR",
      "name": "Zay Flowers",
      "pos": "WR",
      "mean": 17.9
     },
     {
      "slot": "WR",
      "name": "Drake London",
      "pos": "WR",
      "mean": 14.5
     },
     {
      "slot": "WR",
      "name": "Malik Nabers",
      "pos": "WR",
      "mean": 12.4
     },
     {
      "slot": "TE",
      "name": "Tyler Warren",
      "pos": "TE",
      "mean": 12
     },
     {
      "slot": "FLEX",
      "name": "Ladd McConkey",
      "pos": "WR",
      "mean": 10.9
     },
     {
      "slot": "FLEX",
      "name": "Chris Godwin Jr.",
      "pos": "WR",
      "mean": 8.9
     },
     {
      "slot": "K",
      "name": "Cairo Santos",
      "pos": "K",
      "mean": 7.7
     },
     {
      "slot": "DST",
      "name": "Steelers D/ST",
      "pos": "D/ST",
      "mean": 8.4
     }
    ]
   },
   "giantmarv": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 124.3,
    "starters": [
     {
      "slot": "QB",
      "name": "C.J. Stroud",
      "pos": "QB",
      "mean": 16
     },
     {
      "slot": "RB",
      "name": "James Cook III",
      "pos": "RB",
      "mean": 16.1
     },
     {
      "slot": "RB",
      "name": "Rhamondre Stevenson",
      "pos": "RB",
      "mean": 10.4
     },
     {
      "slot": "WR",
      "name": "DeVonta Smith",
      "pos": "WR",
      "mean": 14.8
     },
     {
      "slot": "WR",
      "name": "George Pickens",
      "pos": "WR",
      "mean": 12
     },
     {
      "slot": "WR",
      "name": "Wan'Dale Robinson",
      "pos": "WR",
      "mean": 10.1
     },
     {
      "slot": "TE",
      "name": "George Kittle",
      "pos": "TE",
      "mean": 13.5
     },
     {
      "slot": "FLEX",
      "name": "Jake Ferguson",
      "pos": "TE",
      "mean": 9.2
     },
     {
      "slot": "FLEX",
      "name": "Khalil Shakir",
      "pos": "WR",
      "mean": 8.7
     },
     {
      "slot": "K",
      "name": "Chase McLaughlin",
      "pos": "K",
      "mean": 8.4
     },
     {
      "slot": "DST",
      "name": "Browns D/ST",
      "pos": "D/ST",
      "mean": 5.2
     }
    ]
   },
   "unicornsruegen": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 96.9,
    "starters": [
     {
      "slot": "QB",
      "name": "Joe Burrow",
      "pos": "QB",
      "mean": 19.1
     },
     {
      "slot": "RB",
      "name": "Jacory Croskey-Merritt",
      "pos": "RB",
      "mean": 7.6
     },
     {
      "slot": "RB",
      "name": "Woody Marks",
      "pos": "RB",
      "mean": 6.5
     },
     {
      "slot": "WR",
      "name": "Tre Tucker",
      "pos": "WR",
      "mean": 9.5
     },
     {
      "slot": "WR",
      "name": "Xavier Worthy",
      "pos": "WR",
      "mean": 8.8
     },
     {
      "slot": "WR",
      "name": "Malik Washington",
      "pos": "WR",
      "mean": 8.8
     },
     {
      "slot": "TE",
      "name": "T.J. Hockenson",
      "pos": "TE",
      "mean": 10.7
     },
     {
      "slot": "FLEX",
      "name": "Brenton Strange",
      "pos": "TE",
      "mean": 9.3
     },
     {
      "slot": "FLEX",
      "name": "Isaiah Davis",
      "pos": "RB",
      "mean": 1.5
     },
     {
      "slot": "K",
      "name": "Spencer Shrader",
      "pos": "K",
      "mean": 9.4
     },
     {
      "slot": "DST",
      "name": "Ravens D/ST",
      "pos": "D/ST",
      "mean": 5.7
     }
    ]
   },
   "teambeermode": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 134.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Jalen Hurts",
      "pos": "QB",
      "mean": 17.8
     },
     {
      "slot": "RB",
      "name": "Derrick Henry",
      "pos": "RB",
      "mean": 19.2
     },
     {
      "slot": "RB",
      "name": "Alvin Kamara",
      "pos": "RB",
      "mean": 7.7
     },
     {
      "slot": "WR",
      "name": "Chris Olave",
      "pos": "WR",
      "mean": 18.8
     },
     {
      "slot": "WR",
      "name": "Davante Adams",
      "pos": "WR",
      "mean": 15.3
     },
     {
      "slot": "WR",
      "name": "Deebo Samuel Sr.",
      "pos": "WR",
      "mean": 12.2
     },
     {
      "slot": "TE",
      "name": "Mike Gesicki",
      "pos": "TE",
      "mean": 9
     },
     {
      "slot": "FLEX",
      "name": "Stefon Diggs",
      "pos": "WR",
      "mean": 11.5
     },
     {
      "slot": "FLEX",
      "name": "Jordan Addison",
      "pos": "WR",
      "mean": 9.1
     },
     {
      "slot": "K",
      "name": "Ka'imi Fairbairn",
      "pos": "K",
      "mean": 7.9
     },
     {
      "slot": "DST",
      "name": "49ers D/ST",
      "pos": "D/ST",
      "mean": 5.7
     }
    ]
   },
   "dseinn": {
    "capturedAt": "2026-10-07T16:18:09.529Z",
    "lineup": "current",
    "mode": "mix",
    "teamMean": 164.2,
    "starters": [
     {
      "slot": "QB",
      "name": "Bryce Young",
      "pos": "QB",
      "mean": 19.2
     },
     {
      "slot": "RB",
      "name": "Jahmyr Gibbs",
      "pos": "RB",
      "mean": 24.9
     },
     {
      "slot": "RB",
      "name": "Bijan Robinson",
      "pos": "RB",
      "mean": 23.2
     },
     {
      "slot": "WR",
      "name": "Nico Collins",
      "pos": "WR",
      "mean": 19.6
     },
     {
      "slot": "WR",
      "name": "Jalen Coker",
      "pos": "WR",
      "mean": 13.6
     },
     {
      "slot": "WR",
      "name": "Jaylen Waddle",
      "pos": "WR",
      "mean": 11.8
     },
     {
      "slot": "TE",
      "name": "Isaiah Likely",
      "pos": "TE",
      "mean": 11.5
     },
     {
      "slot": "FLEX",
      "name": "D'Andre Swift",
      "pos": "RB",
      "mean": 14.3
     },
     {
      "slot": "FLEX",
      "name": "RJ Harvey",
      "pos": "RB",
      "mean": 10.6
     },
     {
      "slot": "K",
      "name": "Will Reichard",
      "pos": "K",
      "mean": 10.1
     },
     {
      "slot": "DST",
      "name": "Bills D/ST",
      "pos": "D/ST",
      "mean": 5.3
     }
    ]
   }
  }
 }
};

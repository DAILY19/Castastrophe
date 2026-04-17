# Castastrophe!

A chaotic, browser-based multiplayer fishing party game where everything that *can* go wrong, **does**.

Play live: **https://daily19.github.io/Castastrophe/**

## How to Play

1. Open the game on any device — phones work best
2. Enter your name and **Create Room** to host
3. Share the 4-letter room code with friends (works over WiFi or internet)
4. Friends open the game and **Join Room** with the code
5. Host starts the game — chaos ensues!

## Features

- **Mobile-first** — designed for phone browsers, works on desktop too
- **Real-time multiplayer** — synced via Firebase Realtime Database
- **Pixel art visuals** — custom pixel ocean background and fish sprites
- **Castastrophes** — random chaos events disrupt every round
- **Multiple minigames** — Speed Fishing, Biggest Catch, and more to come
- **Scoring & leaderboard** — points for catches, penalties for junk

## Running Locally

### Quick Start (Windows)

```powershell
.\start.ps1
```

Opens the game at `http://localhost:8080` and prints the Network URL to share with phones on the same WiFi.

| Script | Purpose |
|--------|---------|
| `.\start.ps1` | Start the dev server and open browser |
| `.\stop.ps1` | Stop the running server |
| `.\refresh.ps1` | Stop → clear cache → restart → open browser with cache-bust |
| `.\refresh.ps1 -ReinstallDeps` | Same, but also wipes and reinstalls `node_modules` |

**Options for `start.ps1`:**
```powershell
.\start.ps1 -Port 3000      # use a different port
.\start.ps1 -NoBrowser      # don't auto-open the browser
```

### Manual (any OS)

```bash
npm install
npx http-server . -p 8080 -c-1 --cors
```

## Firebase Setup

The live game uses the `castastrophe-a61bb` Firebase project. To run your own instance:

1. Create a [Firebase project](https://console.firebase.google.com) and enable **Realtime Database**
2. Replace the config values in `js/firebase-config.js` with your own
3. Deploy database rules: `npx firebase deploy --only database`

## Deploy to GitHub Pages

```bash
git push origin main
```

Pages is configured to serve from the `main` branch root. Live at:
`https://daily19.github.io/Castastrophe/`

## Project Structure

```
├── index.html              Single HTML entry point
├── start.ps1               Start dev server
├── stop.ps1                Stop dev server
├── refresh.ps1             Restart + cache-bust
├── css/
│   ├── main.css            Global styles & components
│   └── game.css            In-game styles (ocean background, animations)
├── js/
│   ├── app.js              Main controller & view routing
│   ├── firebase-config.js  Firebase initialization
│   ├── room.js             Room creation & joining
│   ├── lobby.js            Lobby management
│   ├── game.js             Game state machine
│   ├── scoring.js          Fish catalog & score tracking
│   ├── castastrophes.js    Chaos event system
│   ├── ui.js               UI utilities & animations
│   └── minigames/
│       ├── base.js         Base minigame class
│       ├── speed-fishing.js Speed Fishing minigame
│       └── biggest-catch.js Biggest Catch minigame
├── assets/                 Fish sprites, rod animations, UI icons
└── pixel ocean/            Pixel art background and fish sprites
```

## Minigames

| Minigame | Description |
|----------|-------------|
| **Speed Fishing** | Catch as many fish as possible in 30 seconds |
| **Biggest Catch** | One cast — highest weight wins |
| *More coming...* | Trash Collector, Silent Waters, Tug of War, Storm Mode |

## Fish Catalog

| Rarity | Fish | Points |
|--------|------|--------|
| Common | Anchovy, Mackerel, Sea Bass, Trout | 10–25 |
| Uncommon | Salmon, Tuna, Catfish | 35–50 |
| Rare | Swordfish, Great White, Whale | 80–150 |
| Legendary | Golden Fish, Baby Kraken | 200–250 |
| Junk | Old Boot, Tire, Tin Can, Seaweed | -10–0 |

## Castastrophes

Random events triggered during gameplay:

| Tag | Event | Effect |
|-----|-------|--------|
| SNAP | Line Snap | Lose your catch mid-reel |
| BOOT | Boot Instead | Junk catch replaces your fish |
| THEFT | Fish Theft | Another player steals your catch |
| BIRD | Bird Attack | Disrupts your cast |
| BOOM | Explosive Bite | High risk, high reward |
| KNOT | Tangled Lines | Controls reversed |
| FOG | Thick Fog | Reduced visibility |
| WAVE | Giant Wave | All bobbers reset |
| x2 | Double Points | Next catch worth 2× |
| ZAP | Speed Fish | Faster bites, faster escapes |

## Roadmap

- [x] Firebase setup and room system
- [x] Lobby with player list and host controls
- [x] Game state synchronization
- [x] Speed Fishing minigame
- [x] Biggest Catch minigame
- [x] Castastrophe system
- [x] Scoring and leaderboard
- [x] Pixel ocean background and fish sprites
- [x] Ambient swimming fish animations
- [x] Dev scripts (start / stop / refresh)
- [ ] Additional minigames (Trash Collector, Tug of War, etc.)
- [ ] Sound effects and music
- [ ] Player avatars / customization
- [ ] Spectator mode

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (ES modules)
- Firebase Realtime Database
- No build tools, no frameworks
- Hosted on GitHub Pages

## License

MIT

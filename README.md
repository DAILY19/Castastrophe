# Castastrophe!

A browser-based multiplayer party game platform with Firebase room/lobby infrastructure.

Play live: **https://daily19.github.io/Castastrophe/**

## What's Included

- **Room system** — Create/join rooms with 4-letter codes
- **Real-time lobby** — Player list, host controls, presence tracking
- **Firebase sync** — All state flows through Firebase Realtime Database
- **Mobile-first UI** — Responsive design, works on phones and desktop
- **Disconnect handling** — Players marked disconnected, auto-cleanup on leave

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

### Manual (any OS)

```bash
npm install
npx http-server . -p 8080 -c-1 --cors
```

## Firebase Setup

Uses the `castastrophe-a61bb` Firebase project. To run your own instance:

1. Create a [Firebase project](https://console.firebase.google.com) and enable **Realtime Database**
2. Replace the config values in `js/firebase-config.js` with your own
3. Deploy database rules: `npx firebase deploy --only database`

## Deploy to GitHub Pages

```bash
git push origin main
```

Pages is configured to serve from the `main` branch root.

## Project Structure

```
├── index.html              Single HTML entry point
├── css/
│   └── main.css            Global styles & components
├── js/
│   ├── app.js              Main controller & view routing
│   ├── firebase-config.js  Firebase initialization
│   ├── room.js             Room creation & joining
│   ├── lobby.js            Lobby management
│   └── ui.js               UI utilities & animations
└── assets/ui/              UI icons
```

## Adding Your Game

The `onGameStart(roomData)` callback in `js/app.js` is called when the host starts the game. Add your game logic there. The lobby, room, and Firebase infrastructure is ready to use.
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

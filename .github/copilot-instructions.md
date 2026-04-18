# Castastrophe! - Copilot Instructions

## Project Overview
Castastrophe! is a browser-based multiplayer party game platform. It provides room/lobby infrastructure via Firebase — players join on their phones via a room code. Game logic is to be built on top of this foundation.

## Tech Stack
- HTML5, CSS3, vanilla JavaScript (no frameworks)
- Firebase Realtime Database for multiplayer sync
- GitHub Pages for hosting
- Mobile-first responsive design

## Architecture
- Single-page app with view switching (no routing library)
- Firebase handles all real-time state synchronization
- Host player is the authority for game state transitions
- `onGameStart()` callback in app.js is the hook for game logic

## Code Conventions
- Use ES6+ features (const/let, arrow functions, template literals, async/await)
- No build tools — plain browser-compatible JS with ES modules via `<script type="module">`
- CSS uses custom properties for theming
- Mobile-first CSS (min-width media queries for larger screens)

## File Structure
- `index.html` — Single HTML entry point
- `css/main.css` — Global styles & components
- `js/` — JavaScript modules
  - `firebase-config.js` — Firebase initialization
  - `app.js` — Main app controller and view routing
  - `room.js` — Room creation/joining
  - `lobby.js` — Lobby management
  - `ui.js` — UI utilities and animations
- `assets/ui/` — UI icons

## Key Patterns
- Host player is the authority for game state transitions
- All game state flows through Firebase Realtime Database
- Input handling is optimized for touch (tap, hold, swipe)

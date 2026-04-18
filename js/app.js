// ============================================================
// Kepler Klicker — Main Game
// ============================================================
import * as Auth from './auth.js';

// ---- Upgrade Definitions ----
// type: 'dps'          — flat passive stardust/sec per owned
// type: 'click'        — flat bonus click power per owned
// type: 'dps_multi'    — multiplies total DPS (e.g. mult:1.10 = +10% per owned)
// type: 'click_multi'  — multiplies click power (e.g. mult:1.20 = +20% per owned)
const UPGRADES = [
  // ---- Passive Income (DPS) ----
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    desc: '+1/sec each',
    type: 'dps',
    baseCost: 15,
    costScale: 1.15,
    dps: 1,
    icon: 'assets/Icons/Upgrades/Pickaxe_Icon.png',
  },
  {
    id: 'shovel',
    name: 'Shovel',
    desc: '+5/sec each',
    type: 'dps',
    baseCost: 100,
    costScale: 1.15,
    dps: 5,
    icon: 'assets/Icons/Upgrades/Shovel_Icon.png',
  },
  {
    id: 'drill',
    name: 'Drill',
    desc: '+25/sec each',
    type: 'dps',
    baseCost: 500,
    costScale: 1.15,
    dps: 25,
    icon: 'assets/Icons/Upgrades/Drill_Icon.png',
  },
  {
    id: 'excavator',
    name: 'Excavator',
    desc: '+100/sec each',
    type: 'dps',
    baseCost: 2500,
    costScale: 1.15,
    dps: 100,
    icon: 'assets/Icons/Upgrades/Excavator_Icon.png',
  },
  {
    id: 'laser_drill',
    name: 'Laser Drill',
    desc: '+400/sec each',
    type: 'dps',
    baseCost: 12000,
    costScale: 1.15,
    dps: 400,
    icon: 'assets/Icons/Upgrades/Laser_Drill_Icon.png',
  },
  {
    id: 'mega_drill',
    name: 'Mega Drill',
    desc: '+1,600/sec each',
    type: 'dps',
    baseCost: 55000,
    costScale: 1.15,
    dps: 1600,
    icon: 'assets/Icons/Upgrades/Mega_Drill_Icon.png',
  },
  {
    id: 'alien_shovel',
    name: 'Alien Shovel',
    desc: '+6,666/sec each',
    type: 'dps',
    baseCost: 250000,
    costScale: 1.15,
    dps: 6666,
    icon: 'assets/Icons/Upgrades/Alien_Shovel_Icon.png',
  },
  {
    id: 'particle_accelerator',
    name: 'Particle Accelerator',
    desc: '+25,000/sec each',
    type: 'dps',
    baseCost: 1000000,
    costScale: 1.15,
    dps: 25000,
    icon: 'assets/Icons/Upgrades/Particle_Accelerator_Icon.png',
  },
  // ---- Click Power (flat bonus per owned) ----
  {
    id: 'metal_detector',
    name: 'Metal Detector',
    desc: '+2 click each',
    type: 'click',
    baseCost: 75,
    costScale: 1.20,
    clickBonus: 2,
    icon: 'assets/Icons/Upgrades/Metal_Detector_Icon.png',
  },
  {
    id: 'magnet',
    name: 'Magnet',
    desc: '+10 click each',
    type: 'click',
    baseCost: 800,
    costScale: 1.20,
    clickBonus: 10,
    icon: 'assets/Icons/Upgrades/Magnet_Icon.png',
  },
  {
    id: 'adrenaline',
    name: 'Adrenaline',
    desc: '+50 click each',
    type: 'click',
    baseCost: 8000,
    costScale: 1.20,
    clickBonus: 50,
    icon: 'assets/Icons/Upgrades/Adrenaline_Icon.png',
  },
  {
    id: 'adjustable_lens',
    name: 'Adjustable Lens',
    desc: '+250 click each',
    type: 'click',
    baseCost: 80000,
    costScale: 1.20,
    clickBonus: 250,
    icon: 'assets/Icons/Upgrades/Adjustable_Lens_Icon.png',
  },
  // ---- DPS Multipliers ----
  {
    id: 'battery',
    name: 'Battery',
    desc: '+10% all/sec each',
    type: 'dps_multi',
    baseCost: 5000,
    costScale: 1.25,
    mult: 1.10,
    icon: 'assets/Icons/Upgrades/Battery_Icon.png',
  },
  {
    id: 'carbon_fiber',
    name: 'Carbon Fiber',
    desc: '+15% all/sec each',
    type: 'dps_multi',
    baseCost: 100000,
    costScale: 1.25,
    mult: 1.15,
    icon: 'assets/Icons/Upgrades/Carbon_Fiber_Icon.png',
  },
  {
    id: 'heat_displacer',
    name: 'Heat Displacer',
    desc: '+20% all/sec each',
    type: 'dps_multi',
    baseCost: 500000,
    costScale: 1.25,
    mult: 1.20,
    icon: 'assets/Icons/Upgrades/Heat_Displacer_Icon.png',
  },
  // ---- Click Multipliers ----
  {
    id: 'hud_panel',
    name: 'HUD Panel',
    desc: '+15% click each',
    type: 'click_multi',
    baseCost: 3500,
    costScale: 1.25,
    mult: 1.15,
    icon: 'assets/Icons/Upgrades/HUD_Panel_Icon.png',
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    desc: '+20% click each',
    type: 'click_multi',
    baseCost: 35000,
    costScale: 1.25,
    mult: 1.20,
    icon: 'assets/Icons/Upgrades/Spotlight_Icon.png',
  },
  {
    id: 'ventilation',
    name: 'Ventilation',
    desc: '+25% click each',
    type: 'click_multi',
    baseCost: 300000,
    costScale: 1.25,
    mult: 1.25,
    icon: 'assets/Icons/Upgrades/Ventilation_Icon.png',
  },
];

// Planet skins unlocked at total stardust thresholds
const PLANET_SKINS = [
  { threshold: 0,        src: 'assets/Environment/Planets/PNGs/Earth-Like planet.png', spriteSheet: true },
  { threshold: 10000,    src: 'assets/Environment/Planets/PNGs/Ice.png' },
  { threshold: 100000,   src: 'assets/Environment/Planets/PNGs/Lava.png' },
  { threshold: 1000000,  src: 'assets/Environment/Planets/PNGs/Terran.png' },
  { threshold: 10000000, src: 'assets/Environment/Planets/PNGs/Black_hole.png' },
];

// ---- Game State ----
let game = {
  stardust: 0,
  totalStardust: 0,
  owned: {},       // { upgradeId: count }
  musicOn: false,
  sfxOn: true,
  currentSkin: -1,
};

// ---- DOM Refs ----
const elStardust   = document.getElementById('stardust-count');
const elPerSec     = document.getElementById('per-second');
const elPlanet     = document.getElementById('planet');
const elPlanetWrap = document.getElementById('planet-wrapper');
const elFloatNums  = document.getElementById('float-numbers');
const elShopList   = document.getElementById('shop-list');
const elShop       = document.getElementById('shop');
const btnToggle    = document.getElementById('btn-toggle-shop');
const btnMusic     = document.getElementById('btn-music');
const btnSFX       = document.getElementById('btn-sfx');
const btnNextTrack = document.getElementById('btn-next-track');
const btnReset     = document.getElementById('btn-reset');
const btnLogin     = document.getElementById('btn-login');
const btnLeaderboard = document.getElementById('btn-leaderboard');

// ---- Modal refs ----
const elModalOverlay    = document.getElementById('modal-overlay');
const elLoginPanel      = document.getElementById('login-panel');
const elProfilePanel    = document.getElementById('profile-panel');
const elLeaderboardPanel = document.getElementById('leaderboard-panel');
const elProfileName     = document.getElementById('profile-name');
const elProfileScore    = document.getElementById('profile-score');
const elProfileAvatar   = document.getElementById('profile-avatar');
const elLeaderboardList = document.getElementById('leaderboard-list');
const elUserBar         = document.getElementById('user-bar');
const elUserBarName     = document.getElementById('user-bar-name');

// ---- Audio ----
const MUSIC_LOOPS = [
  'assets/Loops/mp3/Sci-Fi 1 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 2 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 3 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 4 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 5 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 6 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 7 Loop.mp3',
  'assets/Loops/mp3/Sci-Fi 8 Loop.mp3',
  'assets/Tracks/mp3/Sci-Fi 1.mp3',
  'assets/Tracks/mp3/Sci-fi 2.mp3',
  'assets/Tracks/mp3/Sci-Fi 3.mp3',
  'assets/Tracks/mp3/Sci-Fi 4.mp3',
  'assets/Tracks/mp3/Sci-Fi 5.mp3',
  'assets/Tracks/mp3/Sci-Fi 6.mp3',
  'assets/Tracks/mp3/Sci-Fi 7.mp3',
  'assets/Tracks/mp3/Sci-Fi 8.mp3',
];
let currentTrackIdx = 0;
let bgMusic = null;

function initMusic() {
  if (bgMusic) return;
  bgMusic = new Audio(MUSIC_LOOPS[currentTrackIdx]);
  bgMusic.volume = 0.3;
  bgMusic.onended = () => {
    currentTrackIdx = (currentTrackIdx + 1) % MUSIC_LOOPS.length;
    bgMusic.src = MUSIC_LOOPS[currentTrackIdx];
    if (game.musicOn) bgMusic.play().catch(() => {});
  };
}

function toggleMusic() {
  initMusic();
  if (game.musicOn) {
    bgMusic.pause();
    game.musicOn = false;
    btnMusic.querySelector('img').src = 'assets/UI/Buttons/BTNs/Music_BTN.png';
  } else {
    bgMusic.play().catch(() => {});
    game.musicOn = true;
    btnMusic.querySelector('img').src = 'assets/UI/Buttons/BTNs_Active/Music_BTN.png';
  }
}

function nextTrack() {
  initMusic();
  currentTrackIdx = (currentTrackIdx + 1) % MUSIC_LOOPS.length;
  bgMusic.src = MUSIC_LOOPS[currentTrackIdx];
  if (game.musicOn) bgMusic.play().catch(() => {});
}

// ---- SFX ----
const SFX_BASE = 'assets/SFX/Stereo/mp3/JDSherbert - Sci Fi UI SFX Pack - ';
let sfxPool = null;

function initSFX() {
  if (sfxPool) return;
  const clicks = Array.from({ length: 5 }, () => {
    const a = new Audio(SFX_BASE + 'Cursor - 1.mp3');
    a.volume = 0.2;
    return a;
  });
  let clickIdx = 0;
  const mkSFX = (name, vol = 0.4) => {
    const a = new Audio(SFX_BASE + name);
    a.volume = vol;
    return a;
  };
  const selectSFX = mkSFX('Select - 1.mp3');
  const errorSFX  = mkSFX('Error - 1.mp3');
  const openSFX   = mkSFX('Popup Open - 1.mp3');
  const closeSFX  = mkSFX('Popup Close - 1.mp3');
  sfxPool = {
    click() {
      if (!game.sfxOn) return;
      clicks[clickIdx].currentTime = 0;
      clicks[clickIdx].play().catch(() => {});
      clickIdx = (clickIdx + 1) % clicks.length;
    },
    buy() {
      if (!game.sfxOn) return;
      selectSFX.currentTime = 0;
      selectSFX.play().catch(() => {});
    },
    error() {
      if (!game.sfxOn) return;
      errorSFX.currentTime = 0;
      errorSFX.play().catch(() => {});
    },
    shopOpen() {
      if (!game.sfxOn) return;
      openSFX.currentTime = 0;
      openSFX.play().catch(() => {});
    },
    shopClose() {
      if (!game.sfxOn) return;
      closeSFX.currentTime = 0;
      closeSFX.play().catch(() => {});
    },
  };
}

function playSFX(name) {
  sfxPool?.[name]?.();
}

function toggleSFX() {
  initSFX();
  game.sfxOn = !game.sfxOn;
  btnSFX.querySelector('img').src = game.sfxOn
    ? 'assets/UI/Buttons/BTNs_Active/Sound_BTN.png'
    : 'assets/UI/Buttons/BTNs/Sound_BTN.png';
}

function updateButtonStates() {
  btnMusic.querySelector('img').src = game.musicOn
    ? 'assets/UI/Buttons/BTNs_Active/Music_BTN.png'
    : 'assets/UI/Buttons/BTNs/Music_BTN.png';
  btnSFX.querySelector('img').src = game.sfxOn
    ? 'assets/UI/Buttons/BTNs_Active/Sound_BTN.png'
    : 'assets/UI/Buttons/BTNs/Sound_BTN.png';
}

// ---- Number Formatting ----
function formatNum(n) {
  if (n < 1000) return Math.floor(n).toLocaleString();
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  const tier = Math.floor(Math.log10(Math.abs(n)) / 3);
  if (tier === 0) return Math.floor(n).toLocaleString();
  const suffix = suffixes[tier] || 'e' + (tier * 3);
  const scaled = n / Math.pow(10, tier * 3);
  return scaled.toFixed(1) + suffix;
}

// ---- Cost Calculation ----
function getCost(upgrade) {
  const owned = game.owned[upgrade.id] || 0;
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costScale, owned));
}

// ---- DPS Calculation ----
function getDPS() {
  let base = 0;
  let mult = 1;
  for (const up of UPGRADES) {
    const owned = game.owned[up.id] || 0;
    if (!owned) continue;
    if (up.type === 'dps') base += owned * up.dps;
    else if (up.type === 'dps_multi') mult *= Math.pow(up.mult, owned);
  }
  return base * mult;
}

// ---- Click Power Calculation (computed from upgrades, not stored) ----
function getClickPower() {
  let base = 1;
  let mult = 1;
  for (const up of UPGRADES) {
    const owned = game.owned[up.id] || 0;
    if (!owned) continue;
    if (up.type === 'click') base += owned * up.clickBonus;
    else if (up.type === 'click_multi') mult *= Math.pow(up.mult, owned);
  }
  return Math.max(1, Math.floor(base * mult));
}

// ---- UI Updates ----
function updateDisplay() {
  elStardust.textContent = formatNum(game.stardust);
  elPerSec.textContent = formatNum(getDPS()) + '/s';
  updateShop();
  updatePlanetSkin();
}

function updatePlanetSkin() {
  let skinIdx = 0;
  for (let i = PLANET_SKINS.length - 1; i >= 0; i--) {
    if (game.totalStardust >= PLANET_SKINS[i].threshold) {
      skinIdx = i;
      break;
    }
  }
  if (skinIdx === game.currentSkin) return;
  game.currentSkin = skinIdx;
  const skin = PLANET_SKINS[skinIdx];
  elPlanet.style.backgroundImage = `url('${skin.src}')`;
  elPlanet.classList.toggle('skin-sprite', !!skin.spriteSheet);
}

// ---- Click Handling ----
function handleClick(e) {
  e.preventDefault();
  initSFX();

  const cp = getClickPower();
  game.stardust += cp;
  game.totalStardust += cp;

  // Animate planet
  elPlanetWrap.classList.remove('clicked');
  void elPlanetWrap.offsetWidth; // reflow
  elPlanetWrap.classList.add('clicked');

  playSFX('click');

  // Floating number
  spawnFloatNumber(e, cp);

  updateDisplay();
}

function spawnFloatNumber(e, amount) {
  const num = document.createElement('div');
  num.className = 'float-number';
  num.textContent = '+' + formatNum(amount);

  // Position near click/touch
  let x, y;
  if (e.touches && e.touches.length) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  // Add random spread
  x += (Math.random() - 0.5) * 40;
  num.style.left = x + 'px';
  num.style.top = y + 'px';

  elFloatNums.appendChild(num);
  num.addEventListener('animationend', () => num.remove());
}

// ---- Shop ----
const TYPE_BADGE = {
  dps:         { label: 'PASSIVE',    cls: 'badge-dps' },
  click:       { label: 'CLICK +',    cls: 'badge-click' },
  dps_multi:   { label: 'DPS ×',      cls: 'badge-dps-multi' },
  click_multi: { label: 'CLICK ×',    cls: 'badge-click-multi' },
};

function renderShop() {
  elShopList.innerHTML = '';
  for (const up of UPGRADES) {
    const cost = getCost(up);
    const owned = game.owned[up.id] || 0;
    const canAfford = game.stardust >= cost;
    const badge = TYPE_BADGE[up.type] || TYPE_BADGE.dps;

    const item = document.createElement('div');
    item.className = 'upgrade-item' + (canAfford ? '' : ' locked');
    item.innerHTML = `
      <img class="upgrade-icon" src="${up.icon}" alt="${up.name}" draggable="false">
      <div class="upgrade-info">
        <div class="upgrade-name">${up.name}</div>
        <div class="upgrade-desc"><span class="upgrade-badge ${badge.cls}">${badge.label}</span>${up.desc}</div>
      </div>
      <div class="upgrade-meta">
        <div class="upgrade-cost">${formatNum(cost)}</div>
        <div class="upgrade-owned">${owned > 0 ? 'x' + owned : ''}</div>
      </div>
    `;

    item.addEventListener('click', () => buyUpgrade(up));
    elShopList.appendChild(item);
  }
}

function updateShop() {
  const items = elShopList.querySelectorAll('.upgrade-item');
  UPGRADES.forEach((up, i) => {
    if (!items[i]) return;
    const cost = getCost(up);
    const owned = game.owned[up.id] || 0;
    const canAfford = game.stardust >= cost;

    items[i].classList.toggle('locked', !canAfford);
    items[i].querySelector('.upgrade-cost').textContent = formatNum(cost);
    items[i].querySelector('.upgrade-owned').textContent = owned > 0 ? 'x' + owned : '';
  });
}

function buyUpgrade(upgrade) {
  const cost = getCost(upgrade);
  if (game.stardust < cost) {
    playSFX('error');
    return;
  }

  game.stardust -= cost;
  game.owned[upgrade.id] = (game.owned[upgrade.id] || 0) + 1;

  playSFX('buy');
  updateDisplay();
}

// ---- Game Loop (passive income) ----
let lastTick = performance.now();

function tick(now) {
  const dt = (now - lastTick) / 1000;
  lastTick = now;

  const dps = getDPS();
  if (dps > 0) {
    const earned = dps * dt;
    game.stardust += earned;
    game.totalStardust += earned;
    updateDisplay();
  }

  requestAnimationFrame(tick);
}

// ---- Save / Load ----
const SAVE_KEY = 'kepler_klicker_save';

function saveGame() {
  const data = {
    stardust: game.stardust,
    totalStardust: game.totalStardust,
    owned: game.owned,
    sfxOn: game.sfxOn,
    savedAt: Date.now(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));

  // Cloud sync when logged in
  Auth.syncScore({
    totalStardust: game.totalStardust,
    stardust: game.stardust,
    owned: game.owned,
  });
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    game.stardust = data.stardust || 0;
    game.totalStardust = data.totalStardust || 0;
    game.owned = data.owned || {};
    if (data.sfxOn !== undefined) game.sfxOn = data.sfxOn;

    // Award offline earnings (capped at 8 hours)
    if (data.savedAt) {
      const elapsed = Math.min((Date.now() - data.savedAt) / 1000, 28800);
      const offlineEarnings = getDPS() * elapsed * 0.5; // 50% efficiency offline
      if (offlineEarnings > 0) {
        game.stardust += offlineEarnings;
        game.totalStardust += offlineEarnings;
      }
    }
  } catch {
    // Corrupted save — start fresh
  }
}

function resetGame() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  localStorage.removeItem(SAVE_KEY);
  game = {
    stardust: 0,
    totalStardust: 0,
    owned: {},
    musicOn: game.musicOn,
    sfxOn: game.sfxOn,
    currentSkin: -1,
  };
  elPlanet.classList.remove('skin-sprite');
  renderShop();
  updateDisplay();
}

// ---- Auto-save every 30s ----
setInterval(saveGame, 30000);

// ---- Modal helpers ----
function showModal(panel) {
  elLoginPanel.hidden      = panel !== 'login';
  elProfilePanel.hidden    = panel !== 'profile';
  elLeaderboardPanel.hidden = panel !== 'leaderboard';
  elModalOverlay.hidden = false;
}

function hideModal() {
  elModalOverlay.hidden = true;
}

// ---- Auth UI ----
function updateAuthUI(user) {
  const loggedIn = !!user;
  // Login button icon toggles between Google (login prompt) and active (logged in)
  btnLogin.querySelector('img').src = loggedIn
    ? 'assets/UI/Buttons/BTNs_Active/Google_BTN.png'
    : 'assets/UI/Buttons/BTNs/Google_BTN.png';

  // User bar under stats
  if (elUserBar) {
    elUserBar.hidden = !loggedIn;
    if (loggedIn && elUserBarName) {
      elUserBarName.textContent = user.displayName || 'Explorer';
    }
  }
}

async function onLoginClick() {
  const user = Auth.getCurrentUser();
  if (user) {
    // Show profile panel
    elProfileName.textContent  = user.displayName || 'Explorer';
    elProfileScore.textContent = formatNum(game.totalStardust);
    if (user.photoURL) {
      elProfileAvatar.innerHTML = `<img src="${user.photoURL}" alt="avatar">`;
    } else {
      const initials = (user.displayName || 'E').charAt(0).toUpperCase();
      elProfileAvatar.textContent = initials;
    }
    showModal('profile');
  } else {
    showModal('login');
  }
}

async function handleGoogleSignIn() {
  try {
    const user = await Auth.signInWithGoogle();
    hideModal();

    // Merge cloud save with local save
    const cloud = await Auth.loadCloudSave();
    if (cloud && cloud.totalStardust > game.totalStardust) {
      game.stardust      = cloud.stardust      || 0;
      game.totalStardust = cloud.totalStardust || 0;
      game.owned         = cloud.owned         || {};
      renderShop();
      updateDisplay();
      showSaveToast('Cloud save loaded!');
    }
    updateAuthUI(user);
    saveGame(); // Sync merged state back to cloud
  } catch (e) {
    console.warn('Sign-in failed:', e);
    showSaveToast('Sign-in failed.');
  }
}

async function handleSignOut() {
  await Auth.signOutUser();
  hideModal();
  updateAuthUI(null);
}

async function openLeaderboard() {
  showModal('leaderboard');
  elLeaderboardList.innerHTML = '<div class="lb-loading">Loading...</div>';

  const entries = await Auth.getLeaderboard(20);
  if (!entries.length) {
    elLeaderboardList.innerHTML = '<div class="lb-loading">No scores yet. Be the first!</div>';
    return;
  }

  const currentUser = Auth.getCurrentUser();
  let html = '';
  entries.forEach((entry, i) => {
    const rank   = i + 1;
    const name   = entry.displayName || 'Explorer';
    const score  = formatNum(entry.totalStardust || 0);
    const isSelf = currentUser && entry.id === currentUser.uid;
    html += `
      <div class="lb-row${isSelf ? ' lb-self' : ''}">
        <span class="lb-rank">${rank}</span>
        <span class="lb-name">${name}</span>
        <span class="lb-score">${score}</span>
      </div>`;
  });
  elLeaderboardList.innerHTML = html;
}

// ---- Save Toast ----
function showSaveToast(msg = 'Game saved!') {
  const existing = document.querySelector('.save-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'save-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  toast.addEventListener('animationend', () => toast.remove());
}

// ---- Keyboard shortcuts ----
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveGame();
    showSaveToast();
  }
});

// ---- Init ----
loadGame();
updateButtonStates();
renderShop();
updateDisplay();
requestAnimationFrame(tick);

// Auth state
Auth.onAuthChange(updateAuthUI);

// ---- Double-tap zoom prevention (iOS Safari ignores user-scalable=no) ----
// If two touchend events fire within 300ms, block the second to prevent zoom.
// Scrollable containers (.shop-list, .leaderboard-list) are exempt so scrolling still works.
let _lastTap = 0;
document.addEventListener('touchend', e => {
  if (e.target.closest('.shop-list, .leaderboard-list')) return;
  const now = performance.now();
  if (now - _lastTap < 300) e.preventDefault();
  _lastTap = now;
}, { passive: false });

// Event listeners
elPlanetWrap.addEventListener('pointerdown', handleClick);
elPlanetWrap.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });
btnToggle.addEventListener('click', () => {
  const collapsed = elShop.classList.toggle('collapsed');
  playSFX(collapsed ? 'shopClose' : 'shopOpen');
});
btnMusic.addEventListener('click', toggleMusic);
btnSFX.addEventListener('click', toggleSFX);
btnNextTrack.addEventListener('click', nextTrack);
btnReset.addEventListener('click', resetGame);
btnLogin.addEventListener('click', onLoginClick);
btnLeaderboard.addEventListener('click', openLeaderboard);

// Modal buttons
document.getElementById('btn-google-signin').addEventListener('click', handleGoogleSignIn);
document.getElementById('btn-guest-play').addEventListener('click', hideModal);
document.getElementById('btn-signout').addEventListener('click', handleSignOut);
document.querySelectorAll('.modal-close-btn').forEach(b => b.addEventListener('click', hideModal));
elModalOverlay.addEventListener('click', e => { if (e.target === elModalOverlay) hideModal(); });

// Save on close
window.addEventListener('beforeunload', saveGame);

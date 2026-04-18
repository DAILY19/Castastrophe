// ============================================================
// UI Utilities
// ============================================================

/** Show a view by id, hiding all others */
export function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
}

/** Show a temporary message */
export function showError(elementId, message, duration = 3000) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  if (duration > 0) {
    setTimeout(() => { el.textContent = ''; }, duration);
  }
}

/** Create a DOM element with optional classes and text */
export function createElement(tag, classes = [], textContent = '') {
  const el = document.createElement(tag);
  classes.forEach(c => el.classList.add(c));
  if (textContent) el.textContent = textContent;
  return el;
}

/** Show a game message (e.g., "Get Ready!") */
export function showGameMessage(text, duration = 2000) {
  const msg = document.getElementById('game-message');
  if (!msg) return;
  msg.textContent = text;
  msg.classList.add('visible');
  if (duration > 0) {
    setTimeout(() => msg.classList.remove('visible'), duration);
  }
}

/** Countdown overlay (3, 2, 1, Go!) */
export function showCountdown() {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'countdown-overlay';
    document.body.appendChild(overlay);

    const nums = ['3', '2', '1', 'Go!'];
    let i = 0;

    const tick = () => {
      if (i >= nums.length) {
        overlay.remove();
        resolve();
        return;
      }
      overlay.innerHTML = '';
      const num = createElement('div', ['countdown-number'], nums[i]);
      overlay.appendChild(num);
      i++;
      setTimeout(tick, 800);
    };

    tick();
  });
}

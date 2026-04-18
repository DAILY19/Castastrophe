// ============================================================
// Kepler Klicker — Auth & Cloud Save (Firebase)
// ============================================================
import { firebaseConfig, FIREBASE_ENABLED } from './firebase-config.js';

const FB_VER = '10.12.0';
const FB_CDN = `https://www.gstatic.com/firebasejs/${FB_VER}`;

let _auth = null;
let _db   = null;
let _currentUser = null;

// Lazy-init Firebase only when needed & enabled
async function _init() {
  if (_auth) return true;
  if (!FIREBASE_ENABLED) return false;
  try {
    const [{ initializeApp }, { getAuth }, { getFirestore }] = await Promise.all([
      import(`${FB_CDN}/firebase-app.js`),
      import(`${FB_CDN}/firebase-auth.js`),
      import(`${FB_CDN}/firebase-firestore.js`),
    ]);
    const app = initializeApp(firebaseConfig);
    _auth = getAuth(app);
    _db   = getFirestore(app);
    return true;
  } catch (e) {
    console.warn('Firebase init failed:', e);
    return false;
  }
}

// ---- Auth ----

export async function onAuthChange(callback) {
  const ok = await _init();
  if (!ok) { callback(null); return; }
  const { onAuthStateChanged } = await import(`${FB_CDN}/firebase-auth.js`);
  onAuthStateChanged(_auth, user => {
    _currentUser = user;
    callback(user);
  });
}

export function getCurrentUser() { return _currentUser; }

export async function signInWithGoogle() {
  const ok = await _init();
  if (!ok) throw new Error('Firebase not configured');
  const { GoogleAuthProvider, signInWithPopup } = await import(`${FB_CDN}/firebase-auth.js`);
  const result = await signInWithPopup(_auth, new GoogleAuthProvider());
  return result.user;
}

export async function signOutUser() {
  const ok = await _init();
  if (!ok) return;
  const { signOut } = await import(`${FB_CDN}/firebase-auth.js`);
  await signOut(_auth);
}

// ---- Cloud Save ----

export async function syncScore({ totalStardust, stardust, owned }) {
  if (!FIREBASE_ENABLED || !_currentUser) return;
  try {
    const { doc, setDoc } = await import(`${FB_CDN}/firebase-firestore.js`);
    await setDoc(doc(_db, 'scores', _currentUser.uid), {
      displayName:   _currentUser.displayName || 'Explorer',
      photoURL:      _currentUser.photoURL || null,
      totalStardust,
      stardust,
      owned,
      savedAt: Date.now(),
    });
  } catch (e) {
    console.warn('Cloud save failed:', e);
  }
}

export async function loadCloudSave() {
  if (!FIREBASE_ENABLED || !_currentUser) return null;
  try {
    const { doc, getDoc } = await import(`${FB_CDN}/firebase-firestore.js`);
    const snap = await getDoc(doc(_db, 'scores', _currentUser.uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn('Cloud load failed:', e);
    return null;
  }
}

// ---- Leaderboard ----

export async function getLeaderboard(limit = 20) {
  const ok = await _init();
  if (!ok) return [];
  try {
    const { collection, query, orderBy, limit: fbLimit, getDocs }
      = await import(`${FB_CDN}/firebase-firestore.js`);
    const q = query(
      collection(_db, 'scores'),
      orderBy('totalStardust', 'desc'),
      fbLimit(limit),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('Leaderboard load failed:', e);
    return [];
  }
}

export { FIREBASE_ENABLED };

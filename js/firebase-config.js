// ====================================================================
// Firebase Configuration — Kepler Klicker
// ====================================================================
// To enable Login & Leaderboard:
//  1. Go to https://console.firebase.google.com
//  2. Open your project (or create a new one)
//  3. Project Settings → General → Your apps → Add Web App
//  4. Copy the config values below from Firebase
//  5. Enable: Authentication → Sign-in method → Google
//  6. Enable: Firestore Database → Create database
//  7. In Firestore Rules, paste and publish:
//       rules_version = '2';
//       service cloud.firestore {
//         match /databases/{database}/documents {
//           match /scores/{userId} {
//             allow read: if true;
//             allow write: if request.auth != null && request.auth.uid == userId;
//           }
//         }
//       }
// ====================================================================

export const firebaseConfig = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT_ID.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId:             'YOUR_APP_ID',
};

// Auto-detected: true once you've filled in real values above
export const FIREBASE_ENABLED = !firebaseConfig.apiKey.startsWith('YOUR_');

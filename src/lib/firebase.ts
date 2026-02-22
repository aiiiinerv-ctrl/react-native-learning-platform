import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, Messaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBhn3MvxHmasOPDt4yobx5n2ldQPVa9BB0",
  authDomain: "rn-learning-platform-4a0a9.firebaseapp.com",
  projectId: "rn-learning-platform-4a0a9",
  storageBucket: "rn-learning-platform-4a0a9.firebasestorage.app",
  messagingSenderId: "922885288030",
  appId: "1:922885288030:web:e046917e7d9abc94f704cf"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Messaging safely (only in browser environment)
export let messaging: Messaging | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

// firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // optional if you're using Firestore
import { getStorage } from 'firebase/storage'; // optional if you're using Storage

const firebaseConfig = {
  apiKey: "AIzaSyD0FKWtLRchdOLj5y8mKXXn9x_wpxYCGaE",
  authDomain: "homechef-2e3c0.firebaseapp.com",
  projectId: "homechef-2e3c0",
  storageBucket: "homechef-2e3c0.firebasestorage.app",
  messagingSenderId: "569173363209",
  appId: "1:569173363209:web:0281c437ea47e16a5306d8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);       // Optional
const storage = getStorage(app);    // Optional

export { app, auth, db, storage };

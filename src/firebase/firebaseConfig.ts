import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0FKWtLRchdOLj5y8mKXXn9x_wpxYCGaE",
  authDomain: "homechef-2e3c0.firebaseapp.com",
  projectId: "homechef-2e3c0",
  storageBucket: "homechef-2e3c0.firebasestorage.app",
  messagingSenderId: "569173363209",
  appId: "1:569173363209:web:0281c437ea47e16a5306d8"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Save user to Firestore (Users collection)
const saveUser = async (user: {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: string;
}) => {
  const userRef = doc(db, "users", user.id);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: new Date().toISOString()
    });
  }
};

// ✅ Google Login
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await saveUser({
    id: user.uid,
    email: user.email || "",
    name: user.displayName || "",
    avatar: user.photoURL || "",
    provider: "google"
  });
};

// ✅ Facebook Login
export const facebookLogin = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await saveUser({
    id: user.uid,
    email: user.email || "",
    name: user.displayName || "",
    avatar: user.photoURL || "",
    provider: "facebook"
  });
};

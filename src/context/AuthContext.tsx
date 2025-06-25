import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  facebookLogin: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

  const formatUser = async (fbUser: FirebaseUser, provider: 'email' | 'google' | 'facebook'): Promise<User> => {
    const userData: User = {
      id: fbUser.uid,
      email: fbUser.email || '',
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'No Name',
      avatar: fbUser.photoURL || '',
      provider
    };

    const userRef = doc(db, 'users', userData.id);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, userData);
    }

    return userData;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const providerId = fbUser.providerData[0]?.providerId || '';
          let tokenProvider: 'google' | 'facebook' | 'email' = 'email';
              if (providerId.includes('facebook')) tokenProvider = 'facebook';
              else if (providerId.includes('google')) tokenProvider = 'google';
        const formatted = await formatUser(fbUser, tokenProvider as User['provider']);
        setUser(formatted);
        localStorage.setItem('homeChefUser', JSON.stringify(formatted));
      } else {
        setUser(null);
        localStorage.removeItem('homeChefUser');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const formatted = await formatUser(result.user, 'email');
      setUser(formatted);
      localStorage.setItem('homeChefUser', JSON.stringify(formatted));
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
  setLoading(true);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      await sendEmailVerification(auth.currentUser); // ✅ Send email verification
    }

    const formatted = await formatUser(result.user, 'email');
    setUser(formatted);
    localStorage.setItem('homeChefUser', JSON.stringify(formatted));
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};


  const googleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const formatted = await formatUser(result.user, 'google');
      setUser(formatted);
      localStorage.setItem('homeChefUser', JSON.stringify(formatted));
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const formatted = await formatUser(result.user, 'facebook');
      setUser(formatted);
      localStorage.setItem('homeChefUser', JSON.stringify(formatted));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('homeChefUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        facebookLogin,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

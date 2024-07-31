import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

let app;
let auth;

export function useFirebase() {
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = siteConfig.customFields.firebaseConfig;

  if (typeof window !== 'undefined' && !app) {
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
    } catch (error) {
      console.error('Firebase initialization error', error);
    }
  }

  return { app, auth };
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useFirebase();

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [auth]);

  return { user, loading, auth };
}
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useFirebaseAuth } from '@site/src/utils/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, loading, auth } = useFirebaseAuth();
  const [authState, setAuthState] = useState({ user, loading });

  useEffect(() => {
    setAuthState({ user, loading });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ ...authState, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
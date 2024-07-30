import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@site/src/utils/firebase';

export function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!user) {
    return <div>このページを表示するにはログインが必要です。</div>;
  }

  return children;
}

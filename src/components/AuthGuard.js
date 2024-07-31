import React from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';

export function AuthGuard({ children, fallback }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!user) {
    return fallback || <div>このコンテンツを表示するにはログインが必要です。</div>;
  }

  return <>{children}</>;
}
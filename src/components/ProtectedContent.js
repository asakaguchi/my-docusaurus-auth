import React from 'react';
import { useAuth } from '@site/src/utils/firebase';

export function ProtectedContent({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <p>このコンテンツを表示するにはログインが必要です。</p>;
  }

  return <>{children}</>;
}
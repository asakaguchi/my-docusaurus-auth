import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from '@site/src/contexts/AuthContext';
import BrowserOnly from '@docusaurus/BrowserOnly';

function AuthContent({ children }) {
  const { user, auth, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('ログインに失敗しました: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError('ログアウトに失敗しました: ' + error.message);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (user) {
    return (
      <div>
        <p>ログイン中のユーザー: {user.email}</p>
        <button onClick={handleSignOut}>ログアウト</button>
        {children}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={signIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">ログイン</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export function Auth({ children }) {
  return (
    <BrowserOnly>
      {() => <AuthContent>{children}</AuthContent>}
    </BrowserOnly>
  );
}
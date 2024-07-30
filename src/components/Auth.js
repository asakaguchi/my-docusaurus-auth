import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@site/src/utils/firebase';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError('');
    } catch (error) {
      setError('ログインに失敗しました: ' + error.message);
    }
  };

  const signOut = () => {
    auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <p>ログイン中: {user.email}</p>
        <button onClick={signOut}>ログアウト</button>
      </div>
    );
  }

  return (
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
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}

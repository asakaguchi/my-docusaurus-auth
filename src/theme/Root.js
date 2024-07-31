import React from 'react';
import { AuthProvider } from '@site/src/contexts/AuthContext';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({ children }) {
  return (
    <BrowserOnly>
      {() => (
        <AuthProvider>{children}</AuthProvider>
      )}
    </BrowserOnly>
  );
}
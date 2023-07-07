import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

import AppFooter from '@components/app-footer/app-footer';
import AppHeader from '@components/app-header/app-header';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const satoshi = localFont({
  src: [
    {
      path: '../../assets/fonts/Satoshi-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
});

export default function Layout({ children }: LayoutProps) {
  const firestore = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp());

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <div
          className={`${satoshi.variable} font-sans ${styles['layout-wrapper']}`}
        >
          <AppHeader />
          <main className={styles['main-wrapper']}>
            <div className={styles['content-wrapper']}>{children}</div>
          </main>
          <AppFooter />
        </div>
      </FirestoreProvider>
    </AuthProvider>
  );
}

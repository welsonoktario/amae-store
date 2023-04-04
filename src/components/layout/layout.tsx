import AppFooter from '@components/app-footer/app-footer';
import AppHeader from '@components/app-header/app-header';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={inter.className}>
      <AppHeader />
      <main className={styles['main-wrapper']}>
        <div className={styles['content-wrapper']}>{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}

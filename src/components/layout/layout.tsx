import AppFooter from '@components/app-footer/app-footer';
import AppHeader from '@components/app-header/app-header';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${poppins.className} ${styles['layout-wrapper']}`}>
      <AppHeader />
      <main className={styles['main-wrapper']}>
        <div className={styles['content-wrapper']}>{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}

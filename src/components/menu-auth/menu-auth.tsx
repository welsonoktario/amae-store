import Link from 'next/link';
import styles from './menu-auth.module.css';

export default function MenuAuth() {
  return (
    <div className={styles['menu-auth-wrapper']}>
      <Link href="/auth/login">Masuk</Link>
      <p className={styles['menu-auth-title']}>Belum ada akun?</p>
    </div>
  );
}

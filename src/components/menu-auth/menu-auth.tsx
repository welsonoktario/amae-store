import Link from 'next/link';
import styles from './menu-auth.module.css';

export default function MenuAuth({ close }: { close: () => void }) {
  return (
    <div className={styles['menu-auth-wrapper']}>
      <div className={styles['menu-auth-title']}>
        <span onClick={close} className="link-primary">
          <Link href="/auth/login">Login</Link>
        </span>{' '}
        atau{' '}
        <span onClick={close} className="link-primary">
          <Link href="/auth/register">daftar</Link>
        </span>{' '}
        akun
      </div>
    </div>
  );
}

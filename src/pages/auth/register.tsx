import InputText from '@/components/input-text/input-text';
import styles from '@styles/components/auth/auth.module.css';
import Head from 'next/head';
import Link from 'next/link';

const Register = () => {
  return (
    <>
      <Head>
        <title>Daftar | Amae Store</title>
      </Head>

      <div className={styles['auth-wrapper']}>
        <form action="" className={styles['auth-form']}>
          <div className={styles['auth-form-content']}>
            <h1 className={styles['auth-title']}>Daftar</h1>

            <InputText
              label="Nama"
              name="nama"
              placeholder="John Doe"
              type="text"
              required
            />

            <InputText
              label="Email"
              name="email"
              placeholder="abc@gmail.com"
              type="text"
              required
            />

            <InputText
              label="No. HP"
              name="hp"
              placeholder="0812xxxxxxxx"
              min={10}
              max={12}
              type="tel"
              required
            />

            <InputText
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />

            <button type="submit" className={styles['auth-btn']}>
              Daftar
            </button>

            <p className={styles['register-wrapper']}>
              Sudah memilki akun?{' '}
              <span className={styles['auth-link']}>
                <Link href="/auth/login">Masuk</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

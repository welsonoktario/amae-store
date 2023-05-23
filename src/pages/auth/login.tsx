import FormCheckbox from '@/components/form-checkbox/form-checkbox';
import FormInput from '@/components/form-input/form-input';
import styles from '@styles/components/auth/auth.module.css';
import Head from 'next/head';
import Link from 'next/link';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | Amae Group</title>
      </Head>

      <div className={styles['auth-wrapper']}>
        <form action="" className={styles['auth-form']}>
          <div className={styles['auth-form-content']}>
            <h1 className={styles['auth-title']}>Masuk</h1>

            <FormInput
              label="Email"
              name="email"
              placeholder="abc@gmail.com"
              type="text"
              required
            />

            <FormInput
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />

            <div className={styles['auth-additional-wrapper']}>
              <FormCheckbox>Ingat saya</FormCheckbox>

              <Link href="/auth/register" className={styles['auth-link']}>
                Lupa password?
              </Link>
            </div>
            <button type="submit" className={styles['auth-btn']}>
              Masuk
            </button>

            <p className={styles['register-wrapper']}>
              Belum memilki akun?{' '}
              <span className={styles['auth-link']}>
                <Link href="/auth/register">Daftar akun baru</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

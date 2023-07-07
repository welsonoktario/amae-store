import FormCheckbox from '@/components/form-checkbox/form-checkbox';
import FormInput from '@/components/form-input/form-input';
import styles from '@styles/components/auth/auth.module.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useSigninCheck } from 'reactfire';

const Login = () => {
  const auth = getAuth();
  const { status, data } = useSigninCheck();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status === 'success' && data.signedIn) {
      router.replace('/');
    }
  }, [status]);

  const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.user) {
      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>Login | Amae Group</title>
      </Head>

      <div className={styles['auth-wrapper']}>
        <form onSubmit={handleLoginForm} className={styles['auth-form']}>
          <div className={styles['auth-form-content']}>
            {status === 'loading' && (
              <div className="min-h-16 flex h-full w-full items-center justify-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            )}

            {status === 'success' && !data.signedIn && (
              <>
                <h1 className={styles['auth-title']}>Masuk</h1>

                <FormInput
                  className="input-primary"
                  label="Email"
                  name="email"
                  placeholder="abc@gmail.com"
                  type="text"
                  value={email}
                  onInputChange={(value) => setEmail(value)}
                  required
                />

                <FormInput
                  className="input-primary"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onInputChange={(value) => setPassword(value)}
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
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

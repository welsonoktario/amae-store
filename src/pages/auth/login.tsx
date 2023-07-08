import FormCheckbox from '@/components/form-checkbox/form-checkbox';
import FormInput from '@/components/form-input/form-input';
import { ModalDialog } from '@/components/modal-dialog/modal-dialog';
import styles from '@styles/components/auth/auth.module.css';
import clsx from 'clsx';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useSigninCheck } from 'reactfire';

const authErrors = {
  'auth/user-not-found': 'Akun tidak ditemukan',
  'auth/wrong-password': 'Email atau password salah',
};

const Login = () => {
  const router = useRouter();
  const auth = getAuth();
  const { status, data } = useSigninCheck();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (status === 'success' && data.signedIn) {
      router.replace('/');
    }
  }, [status]);

  const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res.user) {
        router.back();
      }
    } catch (err: any) {
      if (err.code) {
        setPassword('');
        setErrorMsg((authErrors as any)[err.code]);
        setDialogOpen(true);
      }
    }
    setLoading(false);
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
                <button
                  type="submit"
                  className={clsx(
                    loading ? styles['auth-btn-loading'] : styles['auth-btn'],
                  )}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>Loading
                    </>
                  ) : (
                    'Masuk'
                  )}
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

      <ModalDialog
        open={dialogOpen}
        title="Login Gagal"
        footer={
          <button
            className="btn-primary btn"
            onClick={() => setDialogOpen(false)}
          >
            Tutup
          </button>
        }
      >
        <p>{errorMsg && errorMsg}</p>
      </ModalDialog>
    </>
  );
};

export default Login;

import FormInput from '@/components/form-input/form-input';
import { useStore } from '@/lib/store';
import styles from '@styles/components/auth/auth.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAuth, useFirestore, useSigninCheck } from 'reactfire';

const Register = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const store = useStore();
  const { status, data } = useSigninCheck();

  const [nama, setNama] = useState('');
  const [hp, setHp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status === 'success' && data.signedIn) {
      router.replace('/');
    }
  }, [status]);

  const handleNamaChange = useCallback(
    (val: string) => setNama(val),
    [setNama],
  );
  const handleHpChange = useCallback((val: string) => setHp(val), [setHp]);
  const handleEmailChange = useCallback(
    (val: string) => setEmail(val),
    [setEmail],
  );
  const handlePasswordChange = useCallback(
    (val: string) => setPassword(val),
    [setPassword],
  );

  const handleRegisterForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userRef = doc(firestore, 'Users', credential.user.uid);
      await setDoc(userRef, {
        email,
        nama,
        hp,
        poin: 0,
        saldo: 0,
        membership: 'Publik',
      });
      await auth.updateCurrentUser(credential.user);
      store.setAuthUser({
        email,
        nama,
        hp,
        poin: 0,
        saldo: 0,
        membership: 'Publik',
      });

      router.replace('/');
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar | Amae Group</title>
      </Head>

      <div className={styles['auth-wrapper']}>
        <form onSubmit={handleRegisterForm} className={styles['auth-form']}>
          <div className={styles['auth-form-content']}>
            {status === 'loading' && (
              <div className="min-h-16 flex h-full w-full items-center justify-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            )}

            {status === 'success' && !data.signedIn && (
              <>
                <h1 className={styles['auth-title']}>Daftar</h1>

                <FormInput
                  onInputChange={handleNamaChange}
                  label="Nama"
                  name="nama"
                  placeholder="John Doe"
                  type="text"
                  required
                />

                <FormInput
                  onInputChange={handleEmailChange}
                  label="Email"
                  name="email"
                  placeholder="abc@gmail.com"
                  type="text"
                  required
                />

                <FormInput
                  onInputChange={handleHpChange}
                  label="No. HP"
                  name="hp"
                  placeholder="0812xxxxxxxx"
                  min={10}
                  max={12}
                  type="tel"
                  required
                />

                <FormInput
                  onInputChange={handlePasswordChange}
                  label="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  minLength={6}
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
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

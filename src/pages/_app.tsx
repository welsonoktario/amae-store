import withTransition from '@/components/with-transition';
import Layout from '@components/layout/layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/global.css';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || '',
};

export default function App({ Component, pageProps }: AppProps) {
  const Screen = withTransition(Component);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1"
        />
      </Head>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Layout>
          <Screen {...pageProps} />
        </Layout>
      </FirebaseAppProvider>
    </>
  );
}

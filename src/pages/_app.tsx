import withTransition from '@/components/with-transition/with-transition';
import Layout from '@components/layout/layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/global.css';

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
      <Layout>
        <Screen {...pageProps} />
      </Layout>
    </>
  );
}

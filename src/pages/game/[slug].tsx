import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Game() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Top Up {slug} | Amae Store</title>
      </Head>
    </>
  );
}

import SectionTopUp from '@/components/section-topup/section-top-up';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuth } from 'reactfire';

const Carousel = dynamic(() => import('@/components/carousel/carousel'), {
  ssr: false,
});

const images = [
  'https://picsum.photos/1000/300',
  'https://picsum.photos/1000/300',
  'https://picsum.photos/1000/300',
  'https://picsum.photos/1000/300',
];

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.currentUser);
  }, []);

  return (
    <>
      <Head>
        <title>Amae Group</title>
      </Head>

      <section>
        <Carousel images={images} />
      </section>
      <SectionTopUp />
    </>
  );
}

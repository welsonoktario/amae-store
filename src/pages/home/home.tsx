import SectionTopUp from '@/components/section-topup/section-top-up';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
  return (
    <>
      <Head>
        <title>Amae Store</title>
      </Head>

      <Carousel images={images} />
      <SectionTopUp />
    </>
  );
}

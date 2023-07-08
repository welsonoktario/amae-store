import SectionTopUp from '@/components/section-topup/section-top-up';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Carousel = dynamic(() => import('@/components/carousel/carousel'), {
  ssr: false,
});

const images = ['/web-1.jpg', '/web-2.jpg'];

export default function Home() {
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

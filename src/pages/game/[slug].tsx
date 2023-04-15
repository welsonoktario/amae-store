import Breadcrumbs, {
  BreadcrumbLink,
} from '@/components/breadcrumbs/breadcrumbs';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Game() {
  const router = useRouter();
  const { slug } = router.query;
  const links: BreadcrumbLink[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Mobile Legends',
      href: '/mobile-legends',
      active: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Top Up {slug} | Amae Store</title>
      </Head>
      <Breadcrumbs links={links} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-full md:col-span-2 lg:col-span-3">halo</div>
        <div className="col-span-full md:col-span-6 lg:col-span-9">halo2</div>
      </div>
    </>
  );
}

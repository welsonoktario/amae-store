import Head from 'next/head';

export default function News() {
  return (
    <>
      <Head>
        <title>Berita &amp; Promo | Amae Store</title>
      </Head>

      <h1 className="mb-6 text-2xl font-bold">Berita &amp; Promo</h1>

      <div className="inine-flex space-x-2">
        <button className="btn-primary btn-sm btn">Semua</button>
        <button className="btn-outline btn-primary btn-sm btn">Berita</button>
        <button className="btn-outline btn-primary btn-sm btn">Promo</button>
        <button className="btn-outline btn-primary btn-sm btn">
          Tournament
        </button>
      </div>
    </>
  );
}

import { ArticleType } from '@/components/card-article/card-article';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps<{
  article: ArticleType;
}> = async () => {
  const data: ArticleType = await new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        id: 1,
        title: 'Title 1',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, molestias alias corporis deleniti neque voluptate modi tempore dolorem aliquid, pariatur libero est. Error aliquam unde sint eum vero iste dolore!',
      };

      resolve(data);
    }, 1000);
  });

  return {
    props: {
      article: data,
    },
  };
};

export default function NewsDetail({ article }: { article: ArticleType }) {
  return (
    <>
      <Head>
        <title>{article.title} | Amae Store</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 lg:gap-6">
        <article className="card bg-base-100 shadow-xl md:col-span-3">
          <figure className="relative aspect-video w-full overflow-hidden">
            <Image
              src="https://picsum.photos/1000/500"
              alt={article.title}
              fill
              priority
            />
          </figure>
          <div className="card-body">
            <div className="inline-flex w-fit justify-start space-x-2">
              <p>12 April, 2023</p>
              <p>·</p>
              <Link href="/news?category=2" className="link-primary link">
                Berita
              </Link>
            </div>
            <p className="card-title mt-2 text-2xl font-bold">
              {article.title}
            </p>
            <div className="prose-zinc prose mt-4 max-w-none">
              <p>{article.body}</p>
            </div>
          </div>
        </article>
        <aside>Halo</aside>
      </div>
    </>
  );
}

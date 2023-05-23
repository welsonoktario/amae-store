import CardArticle, {
  type ArticleType,
} from '@/components/card-article/card-article';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const categories = [
  {
    id: 2,
    name: 'Berita',
  },
  {
    id: 3,
    name: 'Promo',
  },
  {
    id: 4,
    name: 'Tournament',
  },
];

export const getServerSideProps: GetServerSideProps<{
  articles: ArticleType[];
}> = async () => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          title: 'Title 1',
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam harum quod eos natus sint molestiae voluptatem, temporibus sequi quia aut pariatur amet ducimus officia impedit eius maxime dicta consequuntur adipisci.',
        },
        {
          id: 2,
          title: 'Title 2',
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam harum quod eos natus sint molestiae voluptatem, temporibus sequi quia aut pariatur amet ducimus officia impedit eius maxime dicta consequuntur adipisci.',
        },
        {
          id: 3,
          title: 'Title 3',
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam harum quod eos natus sint molestiae voluptatem, temporibus sequi quia aut pariatur amet ducimus officia impedit eius maxime dicta consequuntur adipisci.',
        },
      ];
      resolve(data);
    }, 1000);
  });

  return {
    props: {
      articles: data as ArticleType[],
    },
  };
};

export default function News({ articles }: { articles: ArticleType[] }) {
  const router = useRouter();
  const { category: selectedCategory } = router.query;

  return (
    <>
      <Head>
        <title>Berita &amp; Promo | Amae Group</title>
      </Head>

      <h1 className="mb-6 text-2xl font-bold">Berita &amp; Promo</h1>

      <div className="inline-flex flex-nowrap space-x-2 overflow-x-scroll">
        {selectedCategory ? (
          <Link href="/news" className="btn-outline btn-sm btn">
            Semua
          </Link>
        ) : (
          <button className="btn-primary btn-active btn-sm btn">Semua</button>
        )}

        {categories.map((category) =>
          category.id === Number(selectedCategory) ? (
            <button
              key={`category-${category.id}`}
              className="btn-primary btn-active btn-sm btn"
            >
              {category.name}
            </button>
          ) : (
            <Link
              href={`/news?category=${category.id}`}
              key={`category-${category.id}`}
              className="btn-outline btn-sm btn"
            >
              {category.name}
            </Link>
          ),
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {articles.map((article) => (
          <CardArticle key={`article-${article.id}`} {...article} />
        ))}
      </div>
    </>
  );
}

import slugify from '@/lib/utils/slugify';
import Image from 'next/image';
import Link from 'next/link';

export type ArticleType = {
  id: number;
  title: string;
  body: string;
};

export default function CardArticle(props: ArticleType) {
  const slug = slugify(props.title);

  return (
    <Link href={`/news/${slug}`}>
      <article className="card bg-base-100 shadow-xl hover:scale-[1.01] hover:shadow-primary-2 transition-all duration-200 ease-in-out">
        <figure className="relative h-64 w-full overflow-hidden">
          <Image
            src="https://picsum.photos/500/300"
            alt={props.title}
            fill
            priority
          />
        </figure>
        <div className="card-body">
          <div className="inline-flex justify-between text-sm">
            <p>12 April, 2023</p>
            <Link href="/news?category=2" className="link-primary link">
              Berita
            </Link>
          </div>
          <p className="card-title mt-2 text-xl font-bold">{props.title}</p>
          <p className="line-clamp-3 text-zinc-500">{props.body}</p>
        </div>
      </article>
    </Link>
  );
}

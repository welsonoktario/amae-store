import Image from 'next/image';
import Link from 'next/link';
import styles from './card-game.module.css';
import clsx from 'clsx';

export interface CardGameProps {
  slug?: string;
  title: string;
  thumbnail: string;
  className?: string;
}

export default function CardGame({
  slug,
  title,
  thumbnail,
  className,
}: CardGameProps) {
  return (
    <Link
      href={`game/${slug}`}
      className={clsx(styles['card-game'], className)}
    >
      <div className={styles['card-game-img-wrapper']}>
        <Image
          className={styles['card-game-img']}
          src={thumbnail}
          alt={title}
          sizes="(max-width: 768px) 9rem, 14rem"
          fill
          priority
        />
      </div>

      <p className={styles['card-game-title']}>{title}</p>
    </Link>
  );
}

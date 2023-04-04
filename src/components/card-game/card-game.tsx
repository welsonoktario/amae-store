import Image from 'next/image';
import styles from './card-game.module.css';

interface CardGameProps {
  thumbnail: string;
  title: string;
}

export default function CardGame({ thumbnail, title }: CardGameProps) {
  return (
    <div className={styles['card-game']}>
      <div className={styles['card-game-img-wrapper']}>
        <Image
          className={styles['card-game-img']}
          src={thumbnail}
          alt={title}
          sizes="(max-width: 768px) 9rem, 11rem"
          fill
          priority
        />
      </div>

      <p className={styles['card-game-title']}>{title}</p>
    </div>
  );
}

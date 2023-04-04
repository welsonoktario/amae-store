import Image from 'next/image';
import Flickity from 'react-flickity-component';
import styles from './carousel.module.css';

interface CarouseItemProps {
  images: string[];
}

export default function Carousel({ images }: CarouseItemProps) {
  return (
    <Flickity className={styles.carousel} reloadOnUpdate>
      {images.map((image, i) => (
        <div className="relative h-96 w-full" key={`carousel-${i}`}>
          <Image src={image} alt="img-1" fill priority sizes="100vw" />
        </div>
      ))}
    </Flickity>
  );
}

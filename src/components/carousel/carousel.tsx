import Image from 'next/image';
import { EffectCoverflow, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './carousel.module.css';

import 'swiper/css';
import 'swiper/css/navigation';

interface CarouseItemProps {
  images: string[];
}

export default function Carousel({ images }: CarouseItemProps) {
  return (
    <Swiper
      modules={[Navigation, EffectCoverflow]}
      className={styles.carousel}
      spaceBetween={16}
      slidesPerView={1}
      effect="coverflow"
      autoplay={{
        delay: 3000,
      }}
      loop
      navigation
    >
      {images.map((image, i) => (
        <SwiperSlide className={styles['carouse-item']} key={`carousel-${i}`}>
          <Image
            className="rounded-lg"
            src={image}
            alt="img-1"
            fill
            priority
            sizes="100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

import { clsx } from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from './carousel.module.css';

interface CarouseItemProps {
  images: string[];
}

interface CarouselDotsProps {
  itemsLength: number;
  selectedIndex: number;
}

const CarouselDots = ({ itemsLength, selectedIndex }: CarouselDotsProps) => {
  const arr = new Array(itemsLength).fill(0);
  return (
    <div className="flex -translate-y-5 justify-center space-x-1 space-y-1">
      {arr.map((_, index) => {
        const selected = index === selectedIndex;
        return (
          <div
            className={clsx({
              'h-2 w-2 rounded-full bg-primary transition-all duration-300':
                true,
              // tune down the opacity if slide is not selected
              'opacity-50': !selected,
            })}
            key={index}
          ></div>
        );
      })}
    </div>
  );
};

export default function Carousel({ images }: CarouseItemProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on('select', selectHandler);
    // cleanup
    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla relative">
      <div className={styles.carousel} ref={emblaRef}>
        <div className={styles['carousel-container']}>
          {images.map((image, i) => (
            <div className={styles['carousel-item']} key={`carousel-${i}`}>
              <Image src={image} alt="img-1" fill priority sizes="100vw" />
            </div>
          ))}
        </div>
      </div>

      <CarouselDots itemsLength={images.length} selectedIndex={selectedIndex} />

      <button
        className={`embla__prev ${styles['carousel-prev']}`}
        onClick={scrollPrev}
      >
        <svg
          width="31px"
          height="31px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#5ebf39"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke="#5ebf39"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <button
        className={`embla__next ${styles['carousel-next']}`}
        onClick={scrollNext}
      >
        <svg
          width="31px"
          height="31px"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#5ebf39"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="#5ebf39"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

import { clsx } from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from './carousel.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
    <div className="flex -translate-y-5 justify-center space-x-1">
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000 }),
  ]);
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
    <div className="embla md:3/4 relative mx-auto w-full lg:w-3/5">
      <div className={styles.carousel} ref={emblaRef}>
        <div className={styles['carousel-container']}>
          {images.map((image, i) => (
            <div className={styles['carousel-item']} key={`carousel-${i}`}>
              <Image
                src={image}
                alt="img-1"
                sizes="(max-width: 768px) 100vw, (max-width: 1280) 80vw, 60vw"
                fill
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <CarouselDots itemsLength={images.length} selectedIndex={selectedIndex} />

      <button
        className={clsx(
          'embla__prev',
          styles['carousel-nav'],
          styles['carousel-prev'],
        )}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-6 w-6 text-white md:h-8 md:w-8" />
      </button>
      <button
        className={clsx(
          'embla__next',
          styles['carousel-nav'],
          styles['carousel-next'],
        )}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-6 w-6 text-white md:h-8 md:w-8" />
      </button>
    </div>
  );
}

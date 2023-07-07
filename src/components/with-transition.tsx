/* eslint-disable react/display-name */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import clsx from 'clsx';

const withTransition = (Component: NextComponentType) => {
  return (pageProps: any) => {
    const router = useRouter();
    const [transitioning, setTransitioning] = useState(false);
    const transition = clsx({
      'animate-slideUpEnter': !transitioning,
      'animate-slideUpLeave': transitioning,
    });

    useEffect(() => {
      const handler = () => {
        setTransitioning(true);
        setTimeout(() => {
          setTransitioning(false);
        }, 250);
      };
      router.events.on('routeChangeComplete', handler);

      return () => {
        router.events.off('routeChangeComplete', handler);
      };
    }, [router.events]);

    const Loading = () => (
      <div className="container mx-auto h-full">
        <div className="flex h-full w-full items-center justify-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    );

    return (
      <div className={transition}>
        {!transitioning ? <Component {...pageProps} /> : <Loading />}
      </div>
    );
  };
};

export default withTransition;

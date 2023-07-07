import CardGame from '../card-game/card-game';
import { useWindowSize } from '@/hooks';
import { chunk } from '@/lib/utils/chunk';
import clsx from 'clsx';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

export default function SectionTopUp() {
  const { width } = useWindowSize();
  const produsctsRef = collection(useFirestore(), 'Produk');
  const q = query(produsctsRef, orderBy('detail.title'));
  const { status, data: products } = useFirestoreCollectionData(q);

  return (
    <section className="mt-8">
      <p className="mb-4 block font-bold uppercase underline decoration-primary underline-offset-4">
        Top Up Game
      </p>

      {width && (
        <>
          {status === 'loading' && (
            <div className="container mx-auto h-full">
              <div className="flex h-full w-full items-center justify-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            </div>
          )}

          {status == 'success' &&
            chunk(products, width < 786 ? 3 : 6).map((chunk, i) => {
              return (
                <div
                  className="flex items-center justify-center space-x-4"
                  key={`chunk-${i}`}
                >
                  {chunk.map(
                    (product) =>
                      product.detail && (
                        <CardGame
                          key={product.detail.slug}
                          slug={product.detail.slug}
                          title={product.detail.title}
                          thumbnail={product.detail.thumbnail}
                          className={clsx(width < 768 && 'flex-1')}
                        />
                      ),
                  )}
                </div>
              );
            })}
        </>
      )}
    </section>
  );
}

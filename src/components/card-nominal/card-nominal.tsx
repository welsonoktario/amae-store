import { useStore } from '@/lib/store';
import { formatRupiah } from '@/lib/utils';
import { clsx } from 'clsx';

export interface CardNominalProps {
  idProduk: string;
  label: string;
  description: string;
  harga: number;
  subHarga: number;
  kurs: number;
  checked?: boolean;
}

const CardNominal = (props: CardNominalProps) => {
  const cardWrapper = clsx([
    'rounded-lg p-6 my-auto cursor-pointer transition-all duration-300 ease-in-out',
    props.checked ? 'bg-primary-3 text-white' : 'bg-white',
  ]);
  const setSelectedNominal = useStore((state) => state.setSelectedNominal);

  return (
    <div className={cardWrapper} onClick={() => setSelectedNominal(props)}>
      <p className="text-sm font-medium">{props.label}</p>
      <p className="mt-2 text-sm font-bold md:text-lg">
        {formatRupiah(props.harga)}
      </p>
    </div>
  );
};

export default CardNominal;

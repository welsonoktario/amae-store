import { useStore } from '@/lib/store';
import { formatRupiah } from '@/lib/utils';
import { clsx } from 'clsx';

export interface CardNominalProps {
  id: number;
  label: string;
  price: number;
  checked?: boolean;
}

const CardNominal = (props: CardNominalProps) => {
  const cardWrapper = clsx([
    'rounded-lg p-6 my-auto cursor-pointer',
    props.checked ? 'bg-primary-3 text-white' : 'bg-white',
  ]);
  const setSelectedNominal = useStore((state) => state.setSelectedNominal);

  return (
    <div className={cardWrapper} onClick={() => setSelectedNominal(props.id)}>
      <p className="font-medium">{props.label}</p>
      <p className="text-xl font-bold">{formatRupiah(props.price)}</p>
    </div>
  );
};

export default CardNominal;

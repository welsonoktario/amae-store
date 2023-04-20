import { useStore } from '@/lib/store';
import { formatRupiah } from '@/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';

export interface CardPaymentProps {
  id: number;
  img: string;
  name: string;
  nominal: number;
  checked?: boolean;
}

const CardPayment = (props: CardPaymentProps) => {
  const cardWrapper = clsx([
    'inline-flex w-full justify-between rounded-lg items-center p-6 my-auto cursor-pointer transition-all duration-250',
    props.checked ? 'bg-primary-3 text-white' : 'bg-white',
  ]);
  const setSelectedPayment = useStore((state) => state.setSelectedPayment);

  return (
    <div className={cardWrapper} onClick={() => setSelectedPayment(props.id)}>
      <Image src={props.img} alt={props.name} height={64} width={64} />
      <p className="text-sm font-bold md:text-lg">
        {formatRupiah(props.nominal)}
      </p>
    </div>
  );
};

export default CardPayment;

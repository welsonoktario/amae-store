import { useStore } from '@/lib/store';
import { formatRupiah } from '@/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';

export interface CardPaymentProps {
  id: number;
  img: string;
  name: string;
  code?: string;
  paymentMethod: 'va' | 'ewallet' | 'qr';
  nominal: number;
  checked?: boolean;
}

const CardPayment = (props: CardPaymentProps) => {
  const cardWrapper = clsx(
    'inline-flex w-full justify-between rounded-lg items-center p-6 my-auto cursor-pointer transition-all duration-250',
    props.checked ? 'bg-primary-3 text-white' : 'bg-white',
  );
  const [setSelectedPayment, setSelectedPaymentMethod] = useStore((state) => [
    state.setSelectedPayment,
    state.setSelectedPaymentMethod,
  ]);

  return (
    <div
      className={cardWrapper}
      onClick={() => {
        setSelectedPayment(props);
        setSelectedPaymentMethod(props.paymentMethod);
      }}
    >
      <div className="relative">
        <Image
          src={props.img}
          alt={props.name}
          className="h-full w-auto"
          height={64}
          width={64}
        />
      </div>
      <div>
        <p className="block">{props.name}</p>
        <p className="block text-sm font-bold md:text-lg">
          {formatRupiah(props.nominal)}
        </p>
      </div>
    </div>
  );
};

export default CardPayment;

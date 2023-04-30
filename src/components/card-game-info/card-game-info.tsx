import { CardGameProps } from '@/components/card-game/card-game';
import Image from 'next/image';

export interface CardGameInfoProps extends CardGameProps {
  tutorial?: string[];
}

export default function CardGameInfo(props: CardGameInfoProps) {
  return (
    <div className="card bg-primary-2">
      <div className="card-body grid grid-cols-3 p-4 lg:flex lg:grid-cols-1">
        <div className="col-span-1 lg:col-span-full">
          <div className="relative mx-auto aspect-square w-1/2 overflow-hidden rounded-lg lg:w-2/3">
            <Image src={props.thumbnail} alt={props.title} fill />
          </div>
          <p className="text-center font-semibold">{props.title}</p>
        </div>

        <hr className="mx-auto my-4 hidden w-full border-primary lg:inline-grid lg:w-3/4" />

        <ol className="col-span-2 ml-4 list-decimal lg:col-span-full">
          {props.tutorial?.map((step, i) => (
            <li className="mb-2 last:mb-0" key={`step-${i}`}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

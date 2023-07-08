import { CardGameProps } from '@/components/card-game/card-game';
import Image from 'next/image';

export interface CardGameInfoProps extends CardGameProps {
  tutorials?: string[];
}

export default function CardGameInfo(props: CardGameInfoProps) {
  return (
    <div className="card bg-primary-2">
      <div className="card-body grid grid-cols-3 lg:flex lg:grid-cols-1">
        <div className="col-span-1 lg:col-span-full">
          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg md:w-1/2 lg:w-2/3">
            <Image src={props.thumbnail} alt={props.title} fill priority />
          </div>
          <p className="text-center font-semibold">{props.title}</p>
        </div>

        <hr className="mx-auto my-4 hidden w-full border-primary lg:inline-grid lg:w-3/4" />

        <ol className="col-span-2 ml-8 list-decimal text-sm md:ml-4 md:text-base lg:col-span-full">
          {props.tutorials?.map((step, i) => (
            <li className="mb-2 last:mb-0" key={`step-${i}`}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

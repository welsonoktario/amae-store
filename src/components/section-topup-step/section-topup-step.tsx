import { ReactNode } from 'react';

export interface SectionTopupStepProps {
  step: number;
  title: string;
  children: ReactNode;
}

const SectionTopupStep = (props: SectionTopupStepProps) => {
  return (
    <section className="rounded-lg bg-primary-2">
      <div className="inline-flex w-full items-center gap-4 text-xl font-bold">
        <h1 className="w-auto rounded-br-lg rounded-tl-lg bg-primary px-4 py-2 text-base text-white md:text-lg">
          {props.step}
        </h1>
        <p className="text-base md:text-lg">{props.title}</p>
      </div>
      {props.children}
    </section>
  );
};

export default SectionTopupStep;

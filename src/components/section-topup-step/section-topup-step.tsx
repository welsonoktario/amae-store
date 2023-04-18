import { ReactNode } from 'react';

export interface SectionTopupStepProps {
  children: ReactNode;
}

const SectionTopupStep = (props: SectionTopupStepProps) => {
  return (
    <section className="rounded-lg bg-primary-2">
      <div className="inline-flex w-full items-center gap-4 text-xl font-bold">
        <h1 className="w-auto rounded-br-lg rounded-tl-lg bg-primary px-4 py-2 text-white">
          1
        </h1>
        <p>Detail User</p>
      </div>
      <div className="inline-flex w-full items-center gap-4 p-6">
        {props.children}
      </div>
    </section>
  );
};

export default SectionTopupStep;

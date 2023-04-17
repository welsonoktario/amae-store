import FormInput from '@/components/form-input/form-input';
import FormSelect, {
  FormSelectOption,
} from '@/components/form-select/form-select';

const options: FormSelectOption[] = [
  {
    value: 'sea',
    label: 'SEA',
  },
  {
    value: 'eu',
    label: 'EU',
  },
  {
    value: 'na',
    label: 'NA',
  },
];

const SectionTopupStep = () => {
  return (
    <section className="rounded-lg bg-primary-2">
      <div className="inline-flex w-full items-center gap-4 text-xl font-bold">
        <h1 className="w-auto rounded-br-lg rounded-tl-lg bg-primary px-4 py-2 text-white">
          1
        </h1>
        <p>Detail User</p>
      </div>
      <div className="inline-flex w-full items-center gap-4 p-6">
        <FormInput label="User ID" />
        <FormInput label="Server" type="tel" pattern="[0-9]*" />
        <FormSelect name="server" options={options} />
      </div>
    </section>
  );
};

export default SectionTopupStep;

import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import CheckIcon from '@/assets/icons/check.svg';
import styles from './form-select.module.css';

export interface FormSelectOption {
  label: string;
  value: string | number;
}

export interface FormSelectProps {
  name: string;
  options: FormSelectOption[];
}

const FormSelect = (props: FormSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

  return (
    <div className="form-control relative w-full">
      <label className="label" htmlFor="server">
        <span className="label-text font-medium">Server</span>
      </label>
      <Listbox
        as="div"
        className={styles['select-wrapper']}
        value={selectedOption}
        onChange={setSelectedOption}
      >
        <Listbox.Button className="relative my-auto h-full w-full px-4 text-left text-primary">
          <span>{selectedOption?.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ArrowDownIcon className="h-6 w-6 stroke-2" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.options.map((option) => (
              <Listbox.Option
                key={option.label}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-1 text-primary' : 'text-zinc-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate font-medium">
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="h-5 w-5 stroke-2" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default FormSelect;

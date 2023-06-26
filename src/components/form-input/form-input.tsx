import { clsx } from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './form-input.module.css';

interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  onInputChange: (value: string) => void;
}

const FormInput = (props: FormInputProps) => {
  const inputWrapperClasses = clsx(styles['input-wrapper']);

  return (
    <div className={inputWrapperClasses}>
      <label className={styles['input-label']} htmlFor={props.name}>
        <span className={styles['input-label-text']}>{props.label}</span>
      </label>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onInputChange(e.target.value)}
        placeholder={props.placeholder}
        className={clsx(styles['input-text'])}
        required={props.required}
        aria-required={props.required}
      />
    </div>
  );
};

export default FormInput;

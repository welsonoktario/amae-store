import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './input-text.module.css';

interface InputTextProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const InputText = (props: InputTextProps) => {
  return (
    <div className={styles['input-wrapper']}>
      <label className={styles['input-label']} htmlFor={props.name}>
        <span className={styles['input-label-text']}>{props.label}</span>
      </label>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={styles['input-text']}
        required={props.required}
        aria-required={props.required}
      />
    </div>
  );
};

export default InputText;

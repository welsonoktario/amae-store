import { ReactNode } from 'react';
import styles from './input-checkbox.module.css';

interface InputCheckboxProps {
  children: ReactNode;
}

const InputCheckbox = (props: InputCheckboxProps) => {
  return (
    <div className={styles['checkbox-wrapper']}>
      <label className={styles['checkbox-content']}>
        <input type="checkbox" className={styles['checkbox-check']} />
        <span className={styles['checkbox-label']}>{props.children}</span>
      </label>
    </div>
  );
};

export default InputCheckbox;

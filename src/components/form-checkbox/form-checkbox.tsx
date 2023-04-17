import { ReactNode } from 'react';
import styles from './form-checkbox.module.css';

interface FormCheckboxProps {
  children: ReactNode;
}

const FormCheckbox = (props: FormCheckboxProps) => {
  return (
    <div className={styles['checkbox-wrapper']}>
      <label className={styles['checkbox-content']}>
        <input type="checkbox" className={styles['checkbox-check']} />
        <span className={styles['checkbox-label']}>{props.children}</span>
      </label>
    </div>
  );
};

export default FormCheckbox;

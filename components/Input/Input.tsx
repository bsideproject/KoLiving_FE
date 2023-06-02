import React, { forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  type?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { placeholder, register, type, error }: InputProps,
  ref
) {
  return (
    <div>
      <input className={styles.input} placeholder={placeholder || undefined} type={type} {...register} />
      {error && <p className={styles.warning}>{error.message}</p>}
    </div>
  );
});

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: undefined,
};

export default Input;

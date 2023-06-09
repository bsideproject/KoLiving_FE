import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  type?: string;
  error?: FieldError;
  maxLength?: number;
}

function Input({ placeholder, register, type, error, maxLength }: InputProps) {
  const hasError = error && error.message;
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShow((state) => !state);
  };

  return (
    <div className="relative max-w-default w-full">
      <input
        className={`${styles.input} ${hasError ? styles.error : ''}`}
        placeholder={placeholder}
        type={type === 'password' ? (isPasswordShow ? 'text' : 'password') : type}
        maxLength={maxLength}
        {...register}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center mx-4 text-gray-600 h-fit pt-[12px]"
        onClick={togglePasswordVisibility}
        type="button"
      >
        {type === 'password' &&
          (isPasswordShow ? (
            <img src="/icons/eye.png" alt="eye" className={styles.eye} />
          ) : (
            <img src="/icons/eye-close.png" alt="eye" className={styles.eye} />
          ))}
      </button>
      {hasError && <p className={styles.warning}>{error.message}</p>}
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: undefined,
  maxLength: undefined,
};

export default Input;

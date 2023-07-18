import React, { useMemo, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  type?: string;
  error?: FieldError;
  maxLength?: number;
  disabled?: boolean;
}

function Input({ placeholder, register, type, error, maxLength, disabled }: InputProps) {
  const hasError = error && error.message;
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const inputType = useMemo(() => {
    if (type === 'password') {
      return isPasswordShow ? 'text' : 'password';
    }
    return type;
  }, [type, isPasswordShow]);

  const togglePasswordVisibility = () => {
    setIsPasswordShow((state) => !state);
  };

  return (
    <div className="relative w-full">
      <input
        className={`${styles.input} ${hasError ? styles.error : ''}`}
        placeholder={placeholder}
        type={inputType}
        maxLength={maxLength}
        disabled={disabled}
        {...register}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center mx-4 text-gray-600 h-fit pt-[12px]"
        onClick={togglePasswordVisibility}
        type="button"
      >
        {type === 'password' &&
          (isPasswordShow ? (
            <img src="/icons/eye.svg" alt="eye" className={styles.eye} />
          ) : (
            <img src="/icons/eye-close.svg" alt="eye" className={styles.eye} />
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
  disabled: false,
};

export default Input;

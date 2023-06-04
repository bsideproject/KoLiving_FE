/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type: 'button' | 'reset' | 'submit';
  register: UseFormRegisterReturn;
}

/**
 *
 * @param
 * @returns Button Component
 */
const Button: React.FC<ButtonProps> = ({ register, type, children, onClick, disabled = false, className }) => {
  const [primaryStyle, setPlaceholderStyle] = React.useState(styles.placeholder);
  const buttonClass =  `${styles.button} ${className}`;


  return (
    <button
      {...register}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
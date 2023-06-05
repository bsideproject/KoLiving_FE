/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type: 'button' | 'reset' | 'submit';
}

/**
 *
 * @param
 * @returns Button Component
 */
const Button: React.FC<ButtonProps> = ({ type, children, onClick, disabled = false, className }) => {
  const buttonClass = `${styles.button} ${className}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClass} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;

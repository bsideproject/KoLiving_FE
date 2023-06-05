import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
}

/**
 *
 * @param
 * @returns Button Component
 */
const Button: React.FC<ButtonProps> = ({ type = 'button', children, onClick, disabled, className }) => {
  const buttonClass = `${styles.button} ${className}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  className: '',
  type: 'button',
};

export default Button;

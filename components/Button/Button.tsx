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
function Button({ type = 'button', children, onClick, disabled, className }: ButtonProps) {
  const buttonClass = `${styles.button} ${className}`;

  return (
    <button className={styles.button} onClick={onClick} disabled={disabled} type={type}>
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

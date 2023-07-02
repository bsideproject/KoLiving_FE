import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'reset' | 'submit';
  color?: 'r1' | 'r4' | 'g2' | 'none' | 'noBg';
}

/**
 * @param
 * @returns Button Component
 */
function Button({ type = 'button', size, children, onClick, disabled, color }: ButtonProps) {
  const disabledCss = disabled ? styles.disabled : '';

  return (
    <button
      className={`${styles.button} ${styles[`${size}`]} ${styles[`${color}`]} ${disabledCss}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-size={size}
      color={color}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
  size: 'md',
  color: 'r1',
};

export default Button;

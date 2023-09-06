import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'reset' | 'apply';
  type?: 'button' | 'reset' | 'submit';
  color?: 'r1' | 'r4' | 'g2' | 'none' | 'noBg' | 'outlined';
  height?: string;
}

/**
 * @param
 * @returns Button Component
 */
function Button({ type = 'button', size, children, onClick, disabled, color, height }: ButtonProps) {
  const disabledCss = disabled ? styles.disabled : '';
  const styleSize = (size || '').indexOf('px') > -1 ? `w-[${size}]` : styles[`${size}`];
  const heightStyle = height ? `h-[${height}]` : 'h-[54px]';

  return (
    <button
      className={`${styles.button} ${styleSize} ${styles[`${color}`]} ${disabledCss} ${heightStyle}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-size={type !== 'reset' ? size : ''}
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

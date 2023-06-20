import React, { ReactNode } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  variant?: 'header' | 'title' | 'body' | 'label';
  children: ReactNode;
  font?: 'poppins' | 'pretendard';
  fontStyle?: 'semiBold' | 'medium' | 'regular';
}

function Typography({ variant, children, font, fontStyle }: TypographyProps) {
  let className = '';

  switch (variant) {
    case 'header':
      className = `${styles.header} ${styles[`${font}`]}`;
      break;
    case 'title':
      className = `${styles.title} ${styles[`${fontStyle}`]}`;
      break;
    case 'body':
      className = `${styles.body} ${styles[`${fontStyle}`]}`;
      break;
    case 'label':
      className = `${styles.label} ${styles[`${fontStyle}`]}`;
      break;
    default:
      break;
  }

  return <p className={className}>{children}</p>;
}

export default Typography;

Typography.defaultProps = {
  font: 'poppins',
  variant: 'header',
  fontStyle: 'semibold',
};

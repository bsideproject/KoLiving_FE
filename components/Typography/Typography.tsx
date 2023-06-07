import React, { ReactNode } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  variant?: 'header' | 'title' | 'body' | 'label';
  children: ReactNode;
  font?: 'poppins' | 'pretendard';
  textSize?: '24' | '20' | '18' | '16' | '16_24' | '16_19' | '14' | '12';
  fontStyle?: 'semiBold' | 'medium' | 'regular';
}

function Typography({ variant, children, font, textSize, fontStyle }: TypographyProps) {
  let className = '';

  switch (variant) {
    case 'header':
      className = `${styles.header} ${styles[`${font}`]}`;
      break;
    case 'title':
      className = `${styles.title} ${styles[`${fontStyle}`]}`;
      break;
    case 'body':
      className = `${styles.body} ${styles[`${fontStyle}`]} ${styles[`${textSize}`]}`;
      break;
    case 'label':
      className = `${styles.label} ${styles[`${fontStyle}`]} ${styles[`${textSize}`]}`;
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
  textSize: '24',
  fontStyle: 'semibold',
};

import React, { ReactNode } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
  variant: 'heading' | 'subheading' | 'body' | 'caption';
  children: ReactNode;
}

function Typography({ variant, children }: TypographyProps) {
  let className = styles.body;

  switch (variant) {
    case 'heading':
      className = styles.heading;
      break;
    case 'subheading':
      className = styles.subHeading;
      break;
    case 'body':
      className = styles.body;
      break;
    case 'caption':
      className = styles.caption;
      break;
    default:
      break;
  }

  return <p className={className}>{children}</p>;
}

export default Typography;

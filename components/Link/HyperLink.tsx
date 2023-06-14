/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './HyperLink.module.scss';

interface LinkProps {
  outerClassName?: string;
  className?: string;
  href: string;
  children: ReactNode;
  innerText?: string;
  innerClassType?: string;
}

/**
 * Link Component 랑 이름이 동일해서 HyperLink 로 명명
 */
function HyperLink({ href, children, className, outerClassName, innerText, innerClassType }: LinkProps) {
  return (
    <div className={(outerClassName || '') !== '' ? outerClassName : styles.outerLink}>
      <span className={styles[`${innerClassType}`]}>{innerText}</span>
      <Link href={href}>
        <div className={`${(className || '') !== '' ? className : `${styles.link}`}`}>{children}</div>
      </Link>
    </div>
  );
}

export default HyperLink;

/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './HyperLink.module.scss';

interface LinkProps {
  outerClassName ?: string;
  className?: string;
  href?: string;
  children: ReactNode;
}

/**
 * Link Component 랑 이름이 동일해서 HyperLink 로 명명
 */
const HyperLink: React.FC<LinkProps> = ({ href, children, className, outerClassName }) => {
  return (
    <div className={ (outerClassName || '' ) !== '' ? outerClassName : styles.outerLink}>
      <Link href={href}>
        <div clasName={(className || '') !== '' ? className : `${styles.link}`}>{children}</div>
      </Link>
    </div>
 )
}

export default HyperLink;

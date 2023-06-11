import React from 'react';
import Image from 'next/image';
import styles from './CustomImage.module.scss';

interface CustomImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  tp?: string;
}

function CustomImage({ src, alt, width, height, tp }: CustomImageProps) {
  return <Image src={`${src}`} alt={`${alt}`} className={styles[`${tp}`]} width={width} height={height} />;
}

export default CustomImage;

CustomImage.defaultProps = {
  src: '',
  alt: '',
  width: 0,
  height: 0,
  tp: '',
};

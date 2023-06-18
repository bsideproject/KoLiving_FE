import React from 'react';
import Image from 'next/image';
import styles from './CustomImage.module.scss';

interface CustomImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  layout?: string;
  objectFit?: string;
  tp?: string;
}

function CustomImage({ src, alt, width, height, layout, objectFit, tp }: CustomImageProps) {
  return (
    <Image
      src={`${src}`}
      alt={`${alt}`}
      width={width || 0}
      height={height || 0}
      layout={layout || ''}
      // fill={layout ? true : false}
      className={objectFit ? 'objectFit' : styles[`${tp}`]}
    />
  );
}

export default CustomImage;

CustomImage.defaultProps = {
  src: '',
  alt: '',
  width: 10,
  height: 10,
  layout: '',
  objectFit: '',
  tp: '',
};

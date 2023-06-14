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
}

function CustomImage({ src, alt, width, height, layout, objectFit }: CustomImageProps) {
  return (
    <Image
      src={`${src}`}
      alt={`${alt}`}
      width={width ? width : 0}
      height={height ? height : 0}
      layout={layout ? layout : ''}
      // fill={layout ? true : false}
      className={objectFit ? 'objectFit' : ''}
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
};

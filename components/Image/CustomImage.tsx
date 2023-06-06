import React from 'react';
import Image from 'next/image';
import styles from './CustomImage.module.scss';

interface CustomImageProps {
  src?: string;
  alt?: string;
  className?: string;
  customStyles?: string;
}

function CustomImage({ src, alt, className, customStyles }: CustomImageProps) {
  return (
    <div className={customStyles === '' ? styles[`${customStyles}`] : className}>
      <Image src={`${src}`} alt={`${alt}`} className="rounded-md" />
    </div>
  );
}

export default CustomImage;

CustomImage.defaultProps = {
  src: '',
  alt: '',
  className: 'custom-image',
  customStyles: '',
};

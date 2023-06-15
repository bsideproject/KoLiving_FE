import React from 'react';
import CustomImage from '../../components/CustomImage/CustomImage.tsx';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center">
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center mr-8">
            <div className={styles['footer-container']}>
              <CustomImage src="/images/home.png" alt="Image 1" tp="footer" width={20} height={20} />
              <span className="text-g4 font-poppins">Rooms</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center mr-8">
            <div className={styles['footer-container']}>
              <CustomImage src="/images/home.png" alt="Image 1" tp="footer" width={20} height={20} />
              <span className="text-g4 font-poppins">Chat</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center mr-8">
            <div className={styles['footer-container']}>
              <CustomImage src="/images/saved.png" alt="Image 1" tp="footer" width={20} height={20} />
              <span className="text-g4 font-poppins">Liked</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center mr-8">
            <div className={styles['footer-container']}>
              <CustomImage src="/images/me.png" alt="Image 1" tp="footer" width={20} height={20} />
              <span className="text-g4 font-poppins">My</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

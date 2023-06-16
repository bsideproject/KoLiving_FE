import React from 'react';
import LogoWhite from '@/public/icons/logo-white.svg';
import LogoBlack from '@/public/icons/logo-black.svg';
import Plus from '@/public/icons/plus.svg';
import styles from './Header.module.scss';
import Space from '../Space.tsx';

export default function Header() {
  return (
    <div className="bg-g0 w-full h-[66px] text-center ">
      <div className="flex w-full">
        <div className={styles.logo}>
          <LogoBlack width="110px" height="26px" />
        </div>
        <Space />
        <div className="pt-[13px] pr-[13px]">
          <Plus className="stroke-g7 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}

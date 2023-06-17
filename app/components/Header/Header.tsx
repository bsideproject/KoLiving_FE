import React from 'react';
import LogoBlack from '@/public/icons/logo-black.svg';
import LogoWhite from '@/public/icons/logo-white.svg';
import Plus from '@/public/icons/plus.svg';
import Back from '@/public/icons/back.svg';
import Close from '@/public/icons/close.svg';
import Pencil from '@/public/icons/pencil.svg';
import styles from './Header.module.scss';
import Space from '../Space.tsx';

interface HeaderProps {
  type?: 'logo' | 'back';
  title?: string;
  right?: 'plus' | 'close' | 'pencil';
  logoColor?: 'black' | 'white';
  bgColor?: 'white' | 'transparent';
}

const LOGOS = {
  'logo-black': () => <LogoBlack width="110px" height="26px" />,
  'logo-white': () => <LogoWhite width="110px" height="26px" />,
};

const renderHandler = (type: string, color: string) => {
  switch (type) {
    case 'plus':
      return <Plus className={`${color} stroke-[2]`} />;
    case 'close':
      return <Close className={`${color} stroke-[2]`} />;
    case 'pencil':
      return <Pencil className={`${color} stroke-[2]`} />;
    default:
      return null;
  }
};

export default function Header({ type, title, right = 'plus', logoColor = 'black', bgColor = 'white' }: HeaderProps) {
  const strokeColor = bgColor === 'white' ? 'stroke-g7' : 'stroke-g0';
  const Logo = LOGOS[`logo-${logoColor}`];
  const backGroundColor = bgColor === 'white' ? 'bg-g0' : 'bg-transparent';

  return (
    <div className={`${backGroundColor} w-full h-[66px] text-center`}>
      {type === 'logo' && (
        <div className="flex w-full">
          <div className={styles.logo}>{Logo()}</div>
          <Space />
          <div className="pt-[13px] pr-[13px]">{renderHandler(right, strokeColor)}</div>
        </div>
      )}
      {type === 'back' && (
        <div className="flex w-full pt-[14.5px] px-[20px]">
          <Back className="stroke-g7 stroke-[2]" />
          <Space />
          <div className="font-pretendard font-medium text-[18px]">{title}</div>
          <Space />
          {renderHandler(right, strokeColor)}
        </div>
      )}
    </div>
  );
}

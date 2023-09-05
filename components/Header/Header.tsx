import React from 'react';
import LogoBlack from '@/public/icons/logo-black.svg';
import LogoWhite from '@/public/icons/logo-white.svg';
// import Plus from '@/public/icons/plus.svg';
import Plus from '@/public/icons/plus2.svg';
import Back from '@/public/icons/back.svg';
import Close from '@/public/icons/close.svg';
import Pencil from '@/public/icons/pencil.svg';
import styles from './Header.module.scss';
import Space from '../Space.tsx';

interface HeaderProps {
  type?: 'logo' | 'back' | 'title';
  title?: string;
  right?: 'plus' | 'close' | 'pencil';
  logoColor?: 'black' | 'white';
  bgColor?: 'white' | 'transparent';
  hasButton?: boolean;
  handleButtonClick?: () => void;
}

const LOGOS = {
  'logo-black': () => <LogoBlack width="110px" height="26px" />,
  'logo-white': () => <LogoWhite width="110px" height="26px" />,
};

const renderHandler = (type: string | undefined, color: string) => {
  switch (type) {
    case 'plus':
      return <Plus className="stroke-r1" />;
    case 'close':
      return <Close width={24} height={24} className={`${color} stroke-[2]`} />;
    case 'pencil':
      return <Pencil className={`${color} stroke-[2]`} />;
    default:
      return null;
  }
};

export default function Header({
  type,
  title,
  right,
  logoColor = 'black',
  bgColor = 'white',
  handleButtonClick,
  hasButton = true,
}: HeaderProps) {
  const strokeColor = bgColor === 'white' ? 'stroke-g7' : 'stroke-g0';
  const Logo = LOGOS[`logo-${logoColor}`];
  const backGroundColor = bgColor === 'white' ? 'bg-g0' : 'bg-transparent';
  const handleClick = () => {
    if (handleButtonClick) {
      handleButtonClick();
    }
  };

  return (
    <div className={`${backGroundColor} w-full h-[54px] text-center z-[999] fixed max-w-max ${styles.container}`}>
      {type === 'logo' && (
        <div className="flex w-full">
          <div className={styles.logo}>{Logo()}</div>
          <Space />
          <div className="pt-[13px]">
            <button onClick={handleClick}>{renderHandler(right, strokeColor)}</button>
          </div>
        </div>
      )}
      {type === 'back' && (
        <div className="text-center pt-[14.5px]">
          <div className="mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex items-center">
              {hasButton && <Back className="stroke-g7 stroke-[2] cursor-pointer" onClick={handleClick} />}
              <Space />
              <div className="font-pretendard font-medium text-[18px]">{title}</div>
              <Space />
              <button onClick={handleClick}>{renderHandler(right, strokeColor)}</button>
            </div>
          </div>
        </div>
      )}
      {type === 'title' && (
        <div className="flex w-full">
          <div className="text-g7 text-[18px] mt-[12.5px]">{title}</div>
          <Space />
          <div className="pt-[13px]">
            <button onClick={handleClick}>{renderHandler(right, strokeColor)}</button>
          </div>
        </div>
      )}
    </div>
  );
}

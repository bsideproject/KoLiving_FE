import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  handleButtonClick?: () => void;
  type?: 'back' | 'title' | 'logo';
  titleStyle?: string;
  titleCenter?: boolean;
}

function DefaultLayout({ children, title, handleButtonClick, type, titleStyle, titleCenter }: AppLayoutProps) {
  return (
    <>
      <Header
        type={type || 'back'}
        bgColor="white"
        title={title}
        handleButtonClick={handleButtonClick}
        titleStyle={titleStyle}
        titleCenter={titleCenter || false}
      />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default DefaultLayout;

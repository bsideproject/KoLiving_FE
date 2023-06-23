import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  handleButtonClick?: () => void;
}

function DefaultLayout({ children, title, handleButtonClick }: AppLayoutProps) {
  return (
    <>
      <Header type="back" bgColor="white" title={title} handleButtonClick={handleButtonClick} />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default DefaultLayout;

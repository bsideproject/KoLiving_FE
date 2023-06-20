import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: AppLayoutProps) {
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
      <Header type="logo" bgColor="transparent" right="close" logoColor="white" handleButtonClick={goBack} />
      {children}
    </>
  );
}

export default DefaultLayout;

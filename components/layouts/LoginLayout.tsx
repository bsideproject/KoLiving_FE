import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header type="logo" bgColor="transparent" right="close" />
      {children}
    </>
  );
}

export default DefaultLayout;

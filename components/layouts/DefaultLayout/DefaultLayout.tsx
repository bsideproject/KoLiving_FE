import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

function DefaultLayout({ children, title }: AppLayoutProps) {
  return (
    <>
      <Header type="back" bgColor="white" title={title} />
      {children}
    </>
  );
}

export default DefaultLayout;

import React, { Children, ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
import RoomListProvider from '@/context/RoomListProvider';

interface AppLayoutProps {
  children: ReactNode;
}

function FilterLayout({ children }: AppLayoutProps) {
  const childrenName = children;

  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <RoomListProvider>
      <Header type="title" bgColor="white" title="Filters" handleButtonClick={handleButtonClick} right="close" />
      <div className="mx-auto mt-[54px]">{children}</div>
    </RoomListProvider>
  );
}

export default FilterLayout;

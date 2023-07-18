import React, { ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
interface AppLayoutProps {
  children: ReactNode;
}

function RoomListLayout({ children }: AppLayoutProps) {
  const handleButtonClick = () => {
    alert('add!!');
  };

  return (
    <>
      <Header type="logo" bgColor="white" title="koliving" handleButtonClick={handleButtonClick} right="plus" />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default RoomListLayout;

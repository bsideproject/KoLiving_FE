import React, { ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
import { useRouter } from 'next/router';

interface AppLayoutProps {
  children: ReactNode;
}

function RoomListLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/room/add/step1');
  };

  return (
    <>
      <Header type="logo" bgColor="white" title="koliving" handleButtonClick={handleButtonClick} right="plus" />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default RoomListLayout;

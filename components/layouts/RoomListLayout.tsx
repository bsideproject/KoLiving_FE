import React, { ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
import useModal from '@/hooks/useModal.ts';
import Step1 from '@/pages/room/addRoom/step1.tsx';

interface AppLayoutProps {
  children: ReactNode;
}

function RoomListLayout({ children }: AppLayoutProps) {
  const { openModal } = useModal();
  const handleButtonClick = () => {
    openModal({
      props: {
        title: 'Add Rooms',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <Step1 />,
    });
  };

  return (
    <>
      <Header type="logo" bgColor="white" title="koliving" handleButtonClick={handleButtonClick} right="plus" />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default RoomListLayout;

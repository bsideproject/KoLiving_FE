import React, { ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
import useModal from '@/hooks/useModal.ts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Step1 from '@/pages/room/addRoom/step1.tsx';

interface AppLayoutProps {
  children: ReactNode;
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

function RoomListLayout({ children }: AppLayoutProps) {
  const { openModal, closeModal } = useModal();
  const handleButtonClick = () => {
    openModal({
      props: {
        title: 'Add Rooms',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <Step1 closeModal1={closeModal} />,
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

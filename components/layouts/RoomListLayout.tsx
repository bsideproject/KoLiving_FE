import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';
import useModal from '@/hooks/useModal.ts';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Toast, Chip, Select, Typography, Toggle, Checkbox, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Step1 from '@/pages/room/addRoom/step1.tsx';
import { GuList, DongList } from '../../public/js/guDongList.ts';

interface AppLayoutProps {
  children: ReactNode;
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

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

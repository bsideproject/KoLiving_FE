import React from 'react';
// import { useTranslation } from 'next-i18next';
import Header from '@/components/Header/Header.tsx';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';

export default function RoomList() {
  return <div>hi</div>;
}

RoomList.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

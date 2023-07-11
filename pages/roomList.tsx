import React from 'react';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import Chip from '@/components/Chip/Chip.tsx';

export default function RoomList() {
  const deleteRoom = () => {
    console.log('삭제');
  };

  return (
    <>
      <Chip label="test" onDelete={deleteRoom} clicked={false} />{' '}
    </>
  );
}

/** RoomList 주석 추가 */
RoomList.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

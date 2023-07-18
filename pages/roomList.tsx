import React, { useEffect } from 'react';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import Filter from '@/public/icons/filter.svg';
import Router, { useRouter } from 'next/router';
import useRoomList from '@/hooks/useRoomList.ts';

export default function RoomList() {
  const router = useRouter();
  const { setRoomListData, roomListState } = useRoomList();

  const getFilterPage = () => {
    router.push('/filter/filter');
  };

  useEffect(() => {
    console.log('roonListState', roomListState);
    console.log('setRoomListData', setRoomListData);
  }, []);

  return <Filter className="stroke-g7 stroke-[2] cursor-pointer" onClick={getFilterPage} />;
}

/** RoomList 주석 추가 */
RoomList.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

import React, { Component, useEffect, ReactElement, ReactNode } from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RoomCard from '@/components/RoomCard/RoomCard';
import { fetchRooms } from '@/api/room';
import { Room } from '@/public/types/room';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import Filter from '@/public/icons/filter.svg';
import Router, { useRouter, withRouter } from 'next/router';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

type HomeProps = NextPage & {
  getLayout: (page: React.ReactElement, ctx: NextPageContext) => React.ReactNode;
};

function Home() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const router = useRouter();
  const getFilterPage = () => {
    router.push('/room/filter', undefined, { shallow: true });
  };

  const selectRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 최초 접근 시 Room 정보 조회
  useEffect(() => {
    (async () => {
      await selectRooms();
    })();
  }, []);

  // Filter 변경 시 Room 정보 조회
  useEffect(() => {
    /**
     * @TODO filter 내용에 따라 조회되는 내용 다르게 할 수 있도록 파라미터 정보 보내는 로직 추가 필요
     */
    (async () => {
      await selectRooms();
    })();
  }, [router.query]);

  return (
    <div>
      <Filter className="stroke-g7 stroke-[2] cursor-pointer" onClick={getFilterPage} />
      {rooms.map((room, idx) => (
        <RoomCard room={room} key={`room-${idx}`} />
      ))}
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement, ctx: NextPageContext) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

export default Home as HomeProps;

import React, { useEffect } from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RoomCard from '@/components/RoomCard/RoomCard';
import { fetchRooms } from '@/api/room';
import { Room } from '@/public/types/room';
import type { AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import Filter from '@/public/icons/filter.svg';
import Router, { useRouter, withRouter } from 'next/router';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

const Home = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const router = useRouter();
  const getFilterPage = () => {
    router.push('/room/filter', undefined, { shallow: true });
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    /**
     * @TODO filter 내용에 따라 조회되는 내용 다르게 할 수 있도록 파라미터 정보 보내는 로직 추가 필요
     */
    (async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
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
};

export default Home;

(Home as NextPage).getLayout = function getLayout(page: React.ReactElement, ctx: NextPageContext) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

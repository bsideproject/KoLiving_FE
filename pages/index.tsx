import React, { useEffect } from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RoomCard from '@/components/RoomCard/RoomCard';
import { fetchRooms } from '@/api/room';
import { Room } from '@/public/types/room';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

const Home = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);

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

  return (
    <div>
      {rooms.map((room, idx) => (
        <RoomCard room={room} key={`room-${idx}`} />
      ))}
    </div>
  );
};

export default Home;

import { Room } from '@/public/types/room';
import React from 'react';
import { User } from '@/public/types/user';
import Image from 'next/image';
import Card from '../Card/Card';

interface CardProps {
  room: Room;
}

interface UserInfoProps {
  userInfo: User;
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  return (
    <div>
      <img className="rounded-[40px] w-[40px] h-[40px]" src={userInfo.image} alt="user image" />
      뭐야
    </div>
  );
};

export default function RoomCard({ room }: CardProps) {
  return <Card title={<UserInfo userInfo={room?.userInfo} />} />;
}

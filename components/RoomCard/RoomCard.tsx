import { ROOM_TYPE, Room } from '@/public/types/room';
import React from 'react';
import { User } from '@/public/types/user';
import { formatAge, formatDate, formatPrice } from '@/utils/transform';
import Dot from '@/public/icons/dot.svg';
import Like from '@/public/icons/like.svg';
import Card from '../Card/Card';

interface CardProps {
  room: Room;
}

interface UserInfoProps {
  userInfo: User;
}

interface PhotoProps {
  photos: string[];
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  const age = formatAge(userInfo.year);

  return (
    <div className="flex">
      <img className="rounded-[40px] w-[40px] h-[40px]" src={userInfo.image} alt="user" />
      <div className="ml-[12px]">
        <div className="text-[16px] text-g7 font-semibold">{userInfo.name}</div>
        <div className="text-a2 text-[12px]">
          {age} years old
          <span className="text-g3">&nbsp;|&nbsp;</span>
          {userInfo.gender}
        </div>
      </div>
    </div>
  );
};

const Photo = ({ photos }: PhotoProps) => {
  return <div className="h-[190px] bg-cover" style={{ backgroundImage: `url(${photos[0]})` }} />;
};

const Footer = ({ room }: CardProps) => {
  const roomType = room.roomType === ROOM_TYPE.ONE_ROOM ? '1bed flats' : '';

  return (
    <div className="py-[12px] relative">
      <Like className="stroke-g7 stroke-[1.5px] absolute right-[-6px]" />
      <div className="text-g6 text-[12px]">
        {room.dong}, {room.gu}
      </div>
      <div className="font-poppins text-[20px] font-semibold text-g7">
        &#8361;{formatPrice(room.deposit)} <span className="font-pretendard text-[14px] font-medium">/ month</span>
      </div>
      <div className="text-[14px] font-medium">{roomType}</div>
      <div className="text-g5 text-[12px] pb-[12px] flex items-center gap-[6px]">
        {room.bedCount} bedrooms
        <Dot className="fill-g5 stroke-[1.5px]" />
        {room.bathCount} bathrooms
        <Dot className="fill-g5 stroke-[1.5px]" />
        {room.housemateCount} housemates in total
      </div>
      <hr />
      <p className="pt-[10px] font-medium text-[12px]">Available {formatDate(room.availableDate)}</p>
    </div>
  );
};

export default function RoomCard({ room }: CardProps) {
  return (
    <Card
      title={<UserInfo userInfo={room?.userInfo} />}
      content={<Photo photos={room.images} />}
      footer={<Footer room={room} />}
    />
  );
}
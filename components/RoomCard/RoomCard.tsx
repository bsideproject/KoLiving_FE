/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unused-prop-types */
import { ImageFile, ROOM_TYPE, RoomSearch } from '@/public/types/room';
import React, { useState } from 'react';
import { User } from '@/public/types/user';
import { formatAge, formatDate, formatPrice } from '@/utils/transform';
import Dot from '@/public/icons/dot.svg';
import Like from '@/public/icons/like.svg';
import Camera from '@/public/icons/camera.svg';
import styles from '@/pages/room/room.module.scss';
import { useRouter } from 'next/router';
import Card from '../Card/Card';

interface CardProps {
  room: RoomSearch;
  onClick?: () => void;
}

interface UserInfoProps {
  userInfo: User;
}

interface PhotoProps {
  photos: ImageFile[];
  onClick?: () => void;
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  const router = useRouter();
  const age = formatAge(userInfo.birthDate);

  const handleUserClick = () => {
    router.push(
      {
        pathname: '/userInfo',
        query: { data: JSON.stringify(userInfo) },
      },
      '/userInfo'
    );
  };

  return (
    <div className="flex">
      <img
        className="rounded-[40px] w-[40px] h-[40px]"
        src={userInfo.imageUrl || '/images/thumb.png'}
        alt="user"
        onClick={handleUserClick}
      />
      <div className="ml-[12px]">
        <div className="text-[16px] text-g7 font-semibold">{userInfo.firstName}</div>
        <div className="text-a2 text-[12px]">
          {age} years old
          <span className="text-g3">&nbsp;|&nbsp;</span>
          {userInfo.gender}
        </div>
      </div>
    </div>
  );
};

const Photo = ({ photos, onClick }: PhotoProps) => {
  return (photos || []).length ? (
    <div
      className="relative h-[190px] bg-cover"
      style={{ backgroundImage: `url(${photos[0].path})` }}
      onClick={onClick}
    >
      <div className={`${styles.tag} flex items-center gap-[4px]`}>
        <Camera xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" />
        {`+${(photos || []).length}`}
      </div>
    </div>
  ) : (
    <div
      className="relative h-[190px] bg-cover"
      style={{ backgroundImage: `url(/images/thumb.png)` }}
      onClick={onClick}
    />
  );
};

const Footer = ({ room }: CardProps) => {
  const roomType = room.roomInfo.roomType === ROOM_TYPE.ONE_ROOM ? '1bed flats' : '';
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="py-[12px] relative">
      <Like
        className={` ${
          isLiked ? 'stroke-r2 fill-r2' : 'stroke-g7'
        }  stroke-[1.5px] absolute right-[-6px] cursor-pointer`}
        onClick={handleLikeClick}
      />
      <div className="text-g6 text-[12px]">
        {room.location.name}, {room.location.upperLocation?.name}
      </div>
      <div className="font-poppins text-[20px] font-semibold text-g7 gap-[12px] flex items-center">
        &#8361;{formatPrice(room.deposit.amount)}
        <span className="font-pretendard text-[14px] font-medium">/ month </span>
        <span className="font-pretendard text-[14px] text-r1 font-bold bg-g1">
          {room.deposit ? 'Deposit required' : ''}
        </span>
      </div>
      <div className="text-[14px] font-medium">{roomType}</div>
      <div className="text-g5 text-[12px] pb-[12px] flex items-center gap-[6px]">
        {room.roomInfo.bedrooms} bedrooms
        <Dot className="fill-g5 stroke-[1.5px]" />
        {room.roomInfo.bathrooms} bathrooms
        <Dot className="fill-g5 stroke-[1.5px]" />
        {room.roomInfo.roommates} housemates in total
      </div>
      <hr />
      <p className="pt-[10px] font-medium text-[12px]">Available {formatDate(room.availableDate)}</p>
    </div>
  );
};

export default function RoomCard({ room, onClick }: CardProps) {
  return (
    <Card
      title={<UserInfo userInfo={room?.user} />}
      content={<Photo photos={room.images || []} onClick={onClick} />}
      footer={<Footer room={room} />}
    />
  );
}

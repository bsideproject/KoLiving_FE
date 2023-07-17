import { ROOM_TYPE, Room } from '@/public/types/room';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Room[]>) {
  const userInfo = {
    name: 'Dennis',
    image: 'https://source.unsplash.com/random',
    year: 1995,
    gender: 'male',
  };

  const room = {
    userInfo,
    images: [
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
      'https://source.unsplash.com/random',
    ],
    dong: 'Sinseol-dong',
    gu: 'Dongdaemun-gu',
    deposit: 1000,
    availableDate: '2021-08-01',
    roomType: ROOM_TYPE.ONE_ROOM,
    bedCount: 2,
    bathCount: 3,
    housemateCount: 4,
  };

  res.status(200).json([room, room, room, room, room, room]);
}

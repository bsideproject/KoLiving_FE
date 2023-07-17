import { Room } from '@/public/types/room';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Room[]>) {
  const userInfo = {
    name: '김철수',
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
    dong: '신림동',
    gu: '관악구',
    deposit: 1000,
    availableDate: '2021-08-01',
  };

  res.status(200).json([room, room, room, room, room, room]);
}

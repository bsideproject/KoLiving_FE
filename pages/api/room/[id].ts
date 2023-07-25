import { ROOM_TYPE, Room } from '@/public/types/room';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Room>) {
  const userInfo = {
    name: 'Dennis',
    image: 'https://source.unsplash.com/random',
    year: 1995,
    gender: 'male',
    description:
      'Lorem ipsum dolor sit amet consectetur. Nec eget morbi a enim. Pellentesque eget est vestibulum lobortis sit vitae sed sit consectetur.',
  };

  const room = {
    userInfo,
    images: [
      'https://picsum.photos/700/700/?image=100',
      'https://picsum.photos/700/700/?image=1',
      'https://picsum.photos/700/700/?image=2',
      'https://picsum.photos/700/700/?image=3',
      'https://picsum.photos/700/700/?image=4',
    ],
    dong: 'Sinseol-dong',
    gu: 'Dongdaemun-gu',
    deposit: 1000000,
    availableDate: '2021-08-01',
    roomType: ROOM_TYPE.ONE_ROOM,
    bedCount: 2,
    bathCount: 3,
    housemateCount: 4,
    maintenanceFee: 100000,
    maintenanceFeeItems: ['water', 'electricity', 'gas', 'internet'],
    furnishings: ['bed', 'desk', 'chair', 'closet'],
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris et eget cras pharetra et diam arcu. Adipiscing lectus volutpat mattis adipiscing dictum et pellentesque maecenas. Duis interdum consequat ligula et. Mauris at ac ullamcorper arcu. Ac tempor sollicitudin etiam id vitae in pretium amet. Eget massa faucibus gravida aliquet. Mi id auctor duis et morbi pharetra adipiscing.',
  };

  res.status(200).json(room);
}

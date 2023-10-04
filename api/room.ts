import { Furnishing, Room, RoomFile } from '@/public/types/room';
import { headers } from 'next/headers';
import { fetchData } from './index';

const headersInstance = headers();
const token = headersInstance.get('next-auth.session-token');
console.log('%c 🤩🤩🤩 영우의 로그 token: ', 'font-size: x-large; color: #bada55;', '', token);

export const fetchFurnishings = async () => {
  return fetchData<Furnishing[]>('/api/v1/furnishings');
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchData<RoomFile>('/api/v1/files', {
    method: 'POST',
    body: formData,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });
};

export const postRoom = async (room: Room) => {
  return fetchData<Room>('/api/v1/rooms', {
    method: 'POST',
    body: JSON.stringify(room),
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  });
};

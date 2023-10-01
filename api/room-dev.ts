import { RoomDev, RoomPost } from '@/public/types/room';
import { fetchData } from './index-dev';

export const fetchRooms = async () => {
  return fetchData<RoomDev[]>('/api/room');
};

export const fetchRoom = async (id: string) => {
  return fetchData<RoomDev>(`/api/room/${id}`);
};

export const fetchPostRoom = async (data: RoomPost) => {
  return fetchData<RoomPost>(`/api/v1/rooms`);
};

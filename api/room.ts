import { Room } from '@/public/types/room';
import { fetchData } from './index-dev';

export const fetchRooms = async () => {
  return fetchData<Room[]>('/api/room');
};

export const fetchRoom = async (id: string) => {
  return fetchData<Room>(`/api/room/${id}`);
};

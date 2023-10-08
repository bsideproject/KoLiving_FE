import { Furnishing, Room, RoomFile, RoomSearch } from '@/public/types/room';
import { fetchData } from './index';

export const fetchFurnishings = async () => {
  return fetchData<Furnishing[]>('/api/v1/furnishings');
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchData<RoomFile>('/api/v1/files', {
    method: 'POST',
    body: formData,
  });
};

export const postRoom = async (room: Room) => {
  return fetchData<Room>('/api/v1/rooms', {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getRooms = async () => {
  return fetchData<ReturnData<RoomSearch[]>>('/api/v1/rooms/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

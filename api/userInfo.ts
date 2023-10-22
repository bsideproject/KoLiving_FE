import { UserInfoProps } from '@/context/UserInfoProvider.tsx';
import { RoomSearch } from '@/public/types/room';
import { fetchData } from '.';

export const getProfile = async () => {
  return fetchData<UserInfoProps>('/api/v1/my', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getLikedRooms = async (page: number) => {
  let result;
  try {
    result = await fetchData<ReturnData<RoomSearch[]>>(`/api/v1/my/rooms/like/${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('userInfo Error', error);
    throw Error('no Liked Rooms', error as Error);
  }
  return result;
};

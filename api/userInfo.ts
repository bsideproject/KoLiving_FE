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
    result = await fetchData<ReturnData<RoomSearch[]>>(`/api/v1/my/rooms/like/`, {
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

export const makeLikedRooms = async (id: number) => {
    return await fetchData(`/api/v1/rooms/${id}/liked`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
}

export const makeDisLikedRooms = async (id: number) => {
  return await fetchData(`/api/v1/rooms/${id}/disLiked`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
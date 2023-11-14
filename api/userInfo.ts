/* eslint-disable no-return-await */
import { UserInfoProps } from '@/context/UserInfoProvider.tsx';
import { RoomSearch } from '@/public/types/room';
import { Profile } from '@/public/types/user';
import { fetchData } from '.';

export const getProfile = async () => {
  return fetchData<UserInfoProps>('/api/v1/my', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const makeLikedRooms = async (id: number) => {
  return await fetchData(`/api/v1/rooms/${id}/liked`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * @TODO Api 나오면 url 및 params 바꿔줘야함!!
 */
export const makeDisLikedRooms = async (id: number) => {
  return await fetchData(`/api/v1/rooms/${id}/disLiked`, {
    method: 'DELETE',
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

export const modifyProfile = async (profileInfo: Profile) => {
  return await fetchData(`/api/v1/my/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileInfo),
  });
};

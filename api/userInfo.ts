import { UserInfoProps } from '../context/UserInfoProvider.tsx';
import { fetchData } from '.';

export const getProfile = async () => {
  return fetchData<UserInfoProps>('/api/v1/my', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

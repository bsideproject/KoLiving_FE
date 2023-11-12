import { Notification } from '@/public/types/notification';
import { fetchData } from '.';

export const getNotifications = () => {
  return fetchData<Notification[]>('/api/v1/my/notification', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

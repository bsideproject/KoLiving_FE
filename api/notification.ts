import { Notification } from '@/public/types/notification';
import { fetchData } from '.';

export const getNotifications = () => {
  return fetchData<Notification[]>('/api/v1/my/notification', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getNewNotifications = () => {
  return fetchData<Notification[]>('/api/v1/my/notification/check', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateNotification = (id: number) => {
  return fetchData<Notification[]>(`/api/v1/my/notification/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

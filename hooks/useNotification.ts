import { useContext } from 'react';
import { NotificationSetterContext, NotificationStateContext } from '@/context/NotificationProvider.tsx';
import { Notification } from '@/public/types/notification';

function useNotification() {
  const setNotificationState = useContext(NotificationSetterContext);
  const newNotifications = useContext(NotificationStateContext);

  if (!setNotificationState) {
    throw new Error('NotificationSetterContext is not properly initialized');
  }

  const setNewNotifications = (notifications: Notification[]) => {
    if (setNotificationState) {
      setNotificationState.setState(notifications);
    }
  };

  return { setNewNotifications, newNotifications };
}

export default useNotification;

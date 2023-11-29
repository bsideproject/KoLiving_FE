import { useContext } from 'react';
import { NotificationSetterContext, NotificationStateContext } from '@/context/NotificationProvider.tsx';

function useNotification() {
  const setNotificationState = useContext(NotificationSetterContext);
  const notificationCount = useContext(NotificationStateContext);

  if (!setNotificationState) {
    throw new Error('NotificationSetterContext is not properly initialized');
  }

  const setNotificationCount = (count: number) => {
    if (setNotificationState) {
      setNotificationState.setState(count);
    }
  };

  return { setNotificationCount, notificationCount };
}

export default useNotification;

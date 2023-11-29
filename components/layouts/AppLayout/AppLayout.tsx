import React, { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getNotifications } from '@/api/notification';
import useNotification from '@/hooks/useNotification';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const { setNotificationCount } = useNotification();

  const fetchNotification = useCallback(async () => {
    if (router.pathname === '/notice') {
      return;
    }
    const data = await getNotifications();
    if (!data) {
      return;
    }
    // TODO: 확인 안 한 응답 데이터로 변경
    setNotificationCount(data.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [router, fetchNotification]);

  return (
    <div className={`${styles.appLayout} ${styles.center}`}>
      <div className={`${styles.appLayout} ${styles.width}`}>{children}</div>
    </div>
  );
}

export default AppLayout;

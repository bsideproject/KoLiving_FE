import React, { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getNewNotifications } from '@/api/notification';
import useNotification from '@/hooks/useNotification';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const { setNewNotifications } = useNotification();

  const fetchNotification = useCallback(async () => {
    if (router.pathname === '/notice' || router.pathname.includes('/login') || router.pathname.includes('/signup')) {
      return;
    }
    const data = await getNewNotifications();
    if (!data) {
      return;
    }
    setNewNotifications(data);
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

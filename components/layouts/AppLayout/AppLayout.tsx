import React, { ReactNode } from 'react';
import { getSession } from 'next-auth/react';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
  pageProps: any;
}

function AppLayout({ children, pageProps }: AppLayoutProps) {
  getSession().then((session) => {
    const token = session?.user?.token;
    console.log('%c 🤩🤩🤩 영우의 로그 : ', 'font-size: x-large; color: #bada55;', '', token);

    if (typeof window !== 'undefined') {
      const { fetch: originalFetch } = window;
      if (token) {
        window.fetch = async (...args) => {
          // eslint-disable-next-line prefer-const
          let [resource, config] = args;

          config = {
            ...config,
            headers: {
              ...config?.headers,
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await originalFetch(resource, config);

          return response;
        };
      }
    }
  });

  return (
    <div className={`${styles.appLayout} ${styles.center}`}>
      <div className={`${styles.appLayout} ${styles.width}`}>{children}</div>
    </div>
  );
}

export default AppLayout;

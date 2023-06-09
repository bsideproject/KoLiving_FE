import React, { ReactNode } from 'react';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={`${styles.appLayout} ${styles.center}`}>
      <div className={`${styles.appLayout} ${styles.width}`}>{children}</div>
    </div>
  );
}

export default AppLayout;

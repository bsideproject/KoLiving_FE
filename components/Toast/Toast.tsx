import React, { useState, useEffect } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  duration?: number;
  onVisibleChange: (visible: boolean) => void; // 새로운 콜백 함수 추가
}

export default function Toast({ message, duration = 3000, onVisibleChange }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onVisibleChange(!onVisibleChange);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, visible, onVisibleChange]);

  return visible ? <div className={styles.toast}>{message}</div> : null;
}

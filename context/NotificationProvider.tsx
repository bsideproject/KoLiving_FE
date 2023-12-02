import { Notification } from '@/public/types/notification';
import React, { useState, useMemo } from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

interface SetterProps {
  setState: React.Dispatch<Notification[]>;
}

export const NotificationStateContext = React.createContext<Notification[]>([]);
export const NotificationSetterContext = React.createContext<SetterProps | null>(null);

function ModalProvider({ children }: ComponentProps) {
  const [state, setState] = useState<Notification[]>([]);

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <NotificationSetterContext.Provider value={memoizedSetterValue}>
      <NotificationStateContext.Provider value={memoizedStateValue}>{children}</NotificationStateContext.Provider>
    </NotificationSetterContext.Provider>
  );
}

export default ModalProvider;

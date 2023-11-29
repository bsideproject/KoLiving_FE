import React, { useState, useMemo } from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

interface SetterProps {
  setState: React.Dispatch<number>;
}

export const NotificationStateContext = React.createContext<number>(0);
export const NotificationSetterContext = React.createContext<SetterProps | null>(null);

function ModalProvider({ children }: ComponentProps) {
  const [state, setState] = useState<number>(0);

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <NotificationSetterContext.Provider value={memoizedSetterValue}>
      <NotificationStateContext.Provider value={memoizedStateValue}>{children}</NotificationStateContext.Provider>
    </NotificationSetterContext.Provider>
  );
}

export default ModalProvider;

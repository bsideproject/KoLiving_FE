import React, { createContext, useState, useMemo } from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

export interface RoomListProps {
  gu?: string;
  dong?: string;
  depositMin?: number;
  depositMax?: number;
  monthMin?: number;
  monthMax?: number;
  mmddyyyy?: string;
}

interface SetterProps {
  setState: React.Dispatch<React.SetStateAction<RoomListProps>>;
}

export const RoomListStateContext = createContext<RoomListProps | null>(null);
export const RoomListSetterContext = createContext<SetterProps | null>(null);

function RoomListProvider({ children }: ComponentProps) {
  const [state, setState] = useState<RoomListProps>({});

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <RoomListSetterContext.Provider value={memoizedSetterValue}>
      <RoomListStateContext.Provider value={memoizedStateValue}>{children}</RoomListStateContext.Provider>
    </RoomListSetterContext.Provider>
  );
}

export default RoomListProvider;

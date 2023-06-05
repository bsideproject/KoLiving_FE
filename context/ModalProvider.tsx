import React, { useState, useMemo } from 'react';
import { ModalProps } from '../components/Modal/ModalContainer.tsx';

interface ComponentProps {
  children: React.ReactNode;
}

export interface StateProps {
  type?: string | null;
  props: ModalProps | null;
  children?: React.ReactNode;
}

interface SetterProps {
  setState: React.Dispatch<React.SetStateAction<StateProps>>;
}

export const ModalStateContext = React.createContext<StateProps | null>(null);
export const ModalSetterContext = React.createContext<SetterProps | null>(null);

function ModalProvider({ children }: ComponentProps) {
  const [state, setState] = useState<StateProps>({
    type: null,
    props: null,
    children: null,
  });

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <ModalSetterContext.Provider value={memoizedSetterValue}>
      <ModalStateContext.Provider value={memoizedStateValue}>{children}</ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
}

export default ModalProvider;

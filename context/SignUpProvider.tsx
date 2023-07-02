import React, { useState, useMemo } from 'react';
import { ModalProps } from '../components/Modal/ModalContainer.tsx';

interface ComponentProps {
  children: React.ReactNode;
}

export interface SignUpProps {
  email: string;
  yearChecked: boolean;
  termChecked: boolean;
  privacyChecked: boolean;
}

interface SetterProps {
  setState: React.Dispatch<React.SetStateAction<SignUpProps>>;
}

export const SignUpStateContext = React.createContext<SignUpProps | null>(null);
export const SignUpSetterContext = React.createContext<SetterProps | null>(null);

function SignUpProvider({ children }: ComponentProps) {
  const [state, setState] = useState<SignUpProps>({
    email: '',
    yearChecked: false,
    termChecked: false,
    privacyChecked: false,
  });

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <SignUpSetterContext.Provider value={memoizedSetterValue}>
      <SignUpStateContext.Provider value={memoizedStateValue}>{children}</SignUpStateContext.Provider>
    </SignUpSetterContext.Provider>
  );
}

export default SignUpProvider;

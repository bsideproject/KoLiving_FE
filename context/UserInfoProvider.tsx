import React, { useState, useMemo } from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

export interface UserInfoProps {
  id?: number;
  profileId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string;
  description?: string;
  imageFile?: {
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    id?: number;
    path?: string;
    size?: number;
  };
  userRole?: string;
  signUpStatus?: string;
}

interface SetterProps {
  setState: React.Dispatch<React.SetStateAction<UserInfoProps>>;
}

export const UserInfoStateContext = React.createContext<UserInfoProps | null>(null);
export const UserInfoSetterContext = React.createContext<SetterProps | null>(null);

export default function UserInfoProvider({ children }: ComponentProps) {
  const [state, setState] = useState<UserInfoProps>({});

  const memoizedSetterValue = useMemo(() => ({ setState }), [setState]);
  const memoizedStateValue = useMemo(() => state, [state]);

  return (
    <UserInfoSetterContext.Provider value={memoizedSetterValue}>
      <UserInfoStateContext.Provider value={memoizedStateValue}>{children}</UserInfoStateContext.Provider>
    </UserInfoSetterContext.Provider>
  );
}

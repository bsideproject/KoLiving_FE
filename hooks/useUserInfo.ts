import { useContext } from 'react';
import { UserInfoSetterContext, UserInfoStateContext, UserInfoProps } from '../context/UserInfoProvider.tsx';

export default function useUserInfo() {
  const setUserInfoState = useContext(UserInfoSetterContext);
  const userInfoState = useContext(UserInfoStateContext);
  if (!setUserInfoState) {
    throw new Error('UserInfoSetterContext is not properly initialized');
  }

  const setUserInfoData = (data: UserInfoProps) => {
    if (setUserInfoState) {
      setUserInfoState.setState((userInfoData) => {
        return { ...userInfoData, ...data };
      });
    }
  };

  return { setUserInfoData, userInfoState };
}

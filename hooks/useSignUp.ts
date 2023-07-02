import { useContext } from 'react';
import { SignUpSetterContext, SignUpProps, SignUpStateContext } from '../context/SignUpProvider.tsx';

function useSignUp() {
  const setSignUpState = useContext(SignUpSetterContext);
  const signUpState = useContext(SignUpStateContext);

  if (!setSignUpState) {
    throw new Error('SignUpSetterContext is not properly initialized');
  }

  const setSignUpData = (data: SignUpProps) => {
    if (setSignUpState) {
      setSignUpState.setState((signupData) => {
        return { ...signupData, ...data };
      });
    }
  };

  // const getSignUpData = () => {
  //   if (setSignUpState) {
  //     return setSignUpState.state;
  //   }
  // };

  return { setSignUpData, signUpState };
}

export default useSignUp;

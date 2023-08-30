import { fetchData } from '.';

export const postSignup = async (email: string) => {
  return fetchData('/api/v1/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const postPassword = async (payload: ProfilePayload) => {
  const { email, password } = payload;

  return fetchData(`/api/v1/auth/password?email=${email ? encodeURIComponent(email) : ''}`, {
    method: 'POST',
    body: JSON.stringify({
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

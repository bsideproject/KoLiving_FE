import { signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(`${baseURL}${url}`, options);

    if (response.status === 401) {
      try {
        const data = await response.json();

        if (data.error.includes('expired') || data.error.includes('만료')) {
          await signOut();
        }
      } catch (e) {
        throw Error('[401] 에러 응답값이 없습니다');
      } finally {
        return null;
      }
    }

    if (response.status === 204) {
      return null;
    }

    try {
      const data = await response.json();
      return data;
    } catch (e) {
      if (response.status === 200 || response.status === 201) {
        return null;
      }
      throw Error('에러 응답값이 없습니다');
    }
  } catch (error) {
    throw new Error('Failed to fetch data', error as Error);
  }
};

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(`${baseURL}${url}`, options);

    if (response.status === 204) {
      return null;
    }

    try {
      const data = await response.json();
      return data;
    } catch (e) {
      throw Error('에러 응답값이 없습니다');
    }
  } catch (error) {
    throw new Error('Failed to fetch data', error as Error);
  }
};

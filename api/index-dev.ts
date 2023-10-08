// TODO: 일단은 로컬로 한다
const baseURL = process.env.NEXT_PUBLIC_API_HOST_DEV;

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${baseURL}${url}`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(`${baseURL}${url}`, options);

    if (response.status === 204) {
      // error is: "Type 'null' is not assignable to type 'T'."
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // TODO:나중에 삭제
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      if (response.status === 200) {
        return null;
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};

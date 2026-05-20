const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const customInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,

    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return {} as T;
  }

  if (!response.ok) {
    throw data;
  }

  return data as T;
};

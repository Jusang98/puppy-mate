import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/user';

export async function createUser(
  email: string,
  password: string,
  nickname: string,
  profileImageUrl?: string
): Promise<number> {
  const response = await axios
    .post<{ userId: number }>(`${BASE_URL}/signup`, {
      email,
      password,
      nickname,
      profileImageUrl,
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
      throw error;
    });

  return response.data.userId;
}

export async function loginUser(
  email: string,
  password: string
): Promise<number> {
  const response = await axios
    .post<{ userId: number }>(`${BASE_URL}/login`, {
      email,
      password,
    })
    .catch((error) => {
      console.error('Failed to login:', error);
      throw error;
    });

  return response.data.userId;
}

import axios from 'axios';

// 환경변수에서 BASE_URL을 읽어옴 (없으면 localhost fallback)
const BASE_URL = '';

// 새로운 사용자 생성
export async function createUser(
  email: string,
  password: string,
  nickname: string,
  profileImage?: File
): Promise<number> {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('nickname', nickname);
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  try {
    const response = await axios.post<{ userId: number }>(
      `${BASE_URL}/api/user/signup`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.userId;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// 로그인 처리
export async function loginUser(
  email: string,
  password: string
): Promise<{ userId: number; token: string }> {
  try {
    const response = await axios.post<{ userId: number; token: string }>(
      `${BASE_URL}/api/user/login`,
      {
        email,
        password,
      }
    );
    const { userId, token } = response.data;

    // JWT 토큰을 로컬 스토리지에 저장
    localStorage.setItem('authToken', token);

    return { userId, token };
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}

// 로그아웃
export function logoutUser() {
  localStorage.removeItem('authToken');
}

// 유저 프로필 조회
export async function getUserProfile() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    const response = await axios.get(`${BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/user';

// 새로운 사용자 생성
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

// 로그인 처리
export async function loginUser(
  email: string,
  password: string
): Promise<{ userId: number; token: string }> {
  try {
    const response = await axios.post<{ userId: number; token: string }>(
      `${BASE_URL}/login`,
      {
        email,
        password,
      }
    );
    const { userId, token } = response.data;
    // JWT 토큰을 로컬 스토리지에 저장
    localStorage.setItem('authToken', token);

    // userId와 token을 함께 반환
    return { userId, token };
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}

// 이후 인증이 필요한 API 요청에 대한 예시
export async function fetchData() {
  try {
    const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기

    const response = await axios.get(
      'http://localhost:3000/api/some-protected-route',
      {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

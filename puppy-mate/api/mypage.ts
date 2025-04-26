import axios from 'axios';

// 환경변수 사용, 없으면 ''(상대경로)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function getMyCourses() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    // /api/mypage/courses 엔드포인트 호출
    const response = await axios.get(`${BASE_URL}/api/mypage/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getMyCourses:', response.data);
    return response.data; // 내 코스 리스트 배열 반환
  } catch (error) {
    console.error('Failed to fetch my courses:', error);
    throw error;
  }
}

export async function getLikedPostsWithSnapshot() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    const response = await axios.get(`${BASE_URL}/api/mypage/likeposts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getLikedPostsWithSnapshot:', response.data);
    return response.data; // 찜한 게시글 + 좌표 리스트 배열 반환
  } catch (error) {
    console.error('Failed to fetch liked posts:', error);
    throw error;
  }
}

export async function getMyPosts() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    const response = await axios.get(`${BASE_URL}/api/mypage/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getMyPosts:', response.data);
    return response.data; // 내가 작성한 게시글 리스트 반환
  } catch (error) {
    console.error('Failed to fetch my posts:', error);
    throw error;
  }
}

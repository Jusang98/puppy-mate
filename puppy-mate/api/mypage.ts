import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/mypage';

export async function getMyCourses() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');

    // /api/courses/my 엔드포인트 호출
    const response = await axios.get(`${BASE_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

    const response = await axios.get(`${BASE_URL}/likeposts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data; // 찜한 게시글 + 좌표 리스트 배열 반환
  } catch (error) {
    console.error('Failed to fetch liked posts:', error);
    throw error;
  }
}

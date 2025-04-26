import axios from 'axios';

// 환경변수 값이 있으면 사용, 없으면 ''(상대경로)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function getCourseCoordinates(courseId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/coordinates/${courseId}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coordinates:', error);
    throw error;
  }
}

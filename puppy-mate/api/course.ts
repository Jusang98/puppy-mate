import { LatLng } from '@/types/Map';
import axios from 'axios';


// 환경변수가 있으면 사용, 없으면 빈 문자열로 설정
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';


interface CreateCourseResponse {
  id: number;
}

export async function createCourse(
  name: string,
  address: string,
  distance: number,
  duration: number,
  coordinates: LatLng[]
): Promise<number> {
  const response = await axios
    .post<CreateCourseResponse>(`${BASE_URL}/api/courses`, {
      name,
      address,
      distance,
      duration,
      coordinates,
    })
    .catch((error) => {
      console.error('Failed to save course:', error);
      throw error;
    });

  return response.data.id;
}

export async function getPublicCourses() {
  const response = await axios.get(`${BASE_URL}/api/courses`).catch((error) => {
    console.error('Failed to fetch public courses:', error);
    throw error;
  });

  return response.data;
}

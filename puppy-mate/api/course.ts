import { LatLng } from '@/store/useMapStore';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/courses';

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
    .post<CreateCourseResponse>(BASE_URL, {
      name,
      address,
      distance,
      duration,
      coordinates
    })
    .catch(error => {
      console.error('Failed to save course:', error);
      throw error;
    });

  return response.data.id;
}

export async function getPublicCourses() {
  const response = await axios.get(BASE_URL).catch(error => {
    console.error('Failed to fetch public courses:', error);
    throw error;
  });

  return response.data;
}

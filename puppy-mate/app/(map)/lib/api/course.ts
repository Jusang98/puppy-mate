import { LatLng } from '@/store/useMapStore';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/courses';

interface CreateCourseResponse {
  id: number;
}

export async function createCourse(
  name: string,
  courseImageUrl: string,
  address: string,
  distance: number,
  duration: number,
  path: LatLng[]
): Promise<number> {
  const response = await axios
    .post<CreateCourseResponse>(BASE_URL, {
      name,
      courseImageUrl,
      address,
      distance,
      duration,
      coordinates: path
    })
    .catch(error => {
      console.error('Failed to save course:', error);
      throw error;
    });

  return response.data.id;
}

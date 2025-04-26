import axios from 'axios';

const BASE_URL = '';

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

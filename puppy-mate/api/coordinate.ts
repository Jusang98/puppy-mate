import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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

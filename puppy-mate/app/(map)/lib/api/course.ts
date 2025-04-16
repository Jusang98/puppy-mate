import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/courses';
export async function createCourse(): Promise<number> {
  await axios
    .post(BASE_URL, { path: state.path })
    .catch(error => console.error('Failed to save path:', error));
}

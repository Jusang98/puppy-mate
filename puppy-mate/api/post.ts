import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/posts';

export async function createPost(
  userId: number,
  courseId: number,
  title: string,
  content: string,
  images: File[]
): Promise<number> {
  const response = await axios
    .post<{ postId: number }>(BASE_URL, {
      userId,
      courseId,
      title,
      content,
      images
    })
    .catch(error => {
      console.error('Failed to save course:', error);
      throw error;
    });

  return response.data.postId;
}

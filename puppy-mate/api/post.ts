import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/posts';

export async function createPost(
  userId: number,
  courseId: number,
  title: string,
  content: string,
  images: File[]
): Promise<number> {
  const formData = new FormData();

  formData.append('userId', userId.toString());
  formData.append('courseId', courseId.toString());
  formData.append('title', title);
  formData.append('content', content);

  // 이미지 파일들을 FormData에 추가
  images.forEach(image => {
    formData.append('images', image);
  });

  const response = await axios.post<{ newPostId: number }>(BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.newPostId;
}

import { PostDto } from '@/application/usecases/post/dto/PostDto';
import axios from 'axios';
import { CoursePost } from '@/types/Post';
const BASE_URL = 'http://localhost:3000/api/posts';

export async function createPost(
  courseId: number,
  title: string,
  content: string,
  images: File[]
): Promise<number> {
  const formData = new FormData();
  formData.append('courseId', courseId.toString());
  formData.append('title', title);
  formData.append('content', content);

  // 이미지 파일들을 FormData에 추가
  images.forEach((image) => {
    formData.append('images', image);
  });

  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');
  const response = await axios.post<{ newPostId: number }>(BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.newPostId;
}

export async function getPost(postId: string) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios<{ data: PostDto }>(`${BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    throw error;
  }
}

export async function getPostsByCourseId(courseId: number): Promise<CoursePost[]> {
  const response = await axios.get<CoursePost[]>(`${BASE_URL}?courseId=${courseId}`).catch((error) => {
    console.error('Failed to get posts by course id:', error);
    throw error;
  });

  return response.data;
}

export async function deletePost(
  postId: string
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.delete(`${BASE_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw error;
  }
}
export async function updatePost(
  postId: string,
    title: string,
    content: string,
) {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(`${BASE_URL}/${postId}`, {
      id: postId,
      title,
      content,
   }, {
      headers: {
        Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가
      }
   });

    return response.data; 
  } catch (error: any) {
    console.error('게시글 수정 실패:', error);
    throw new Error(
      error.response?.data?.error || '게시글 수정 중 오류가 발생했습니다.'
    );
  }
}

import { PostDto } from '@/application/usecases/post/dto/PostDto';
import axios from 'axios';
import { CoursePost } from '@/types/Post';

// 환경변수에서 BASE_URL을 읽어옴. 없으면 localhost fallback
const BASE_URL = '';

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

  images.forEach((image) => {
    formData.append('images', image);
  });

  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  const response = await axios.post<{ newPostId: number }>(
    `${BASE_URL}/api/posts`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.newPostId;
}

export async function getPost(postId: string): Promise<PostDto> {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    const response = await axios.get<{ data: PostDto }>(
      `${BASE_URL}/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    throw error;
  }
}

export async function getPostsByCourseId(
  courseId: number
): Promise<CoursePost[]> {
  try {
    const response = await axios.get<CoursePost[]>(
      `${BASE_URL}/api/posts?courseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get posts by course id:', error);
    throw error;
  }
}

export async function deletePost(
  postId: string
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    const response = await axios.delete(`${BASE_URL}/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  content: string
) {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    const response = await axios.patch(
      `${BASE_URL}/api/posts/${postId}`,
      {
        id: postId,
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('게시글 수정 실패:', error);
    throw new Error(
      error.response?.data?.error || '게시글 수정 중 오류가 발생했습니다.'
    );
  }
}

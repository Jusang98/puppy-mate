import axios from 'axios';

// 환경변수에 BASE_URL이 있으면 사용, 없으면 상대경로
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  : '/api/posts';

export async function likePost(postId: number): Promise<void> {
  try {
    const token = localStorage.getItem('authToken');
    await axios.post(`${BASE_URL}/${postId}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error('Failed to like post:', error);
    const message = error.response?.data?.error || 'Failed to like post';
    throw new Error(message);
  }
}

export async function unlikePost(postId: number): Promise<void> {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`${BASE_URL}/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error('Failed to unlike post:', error);
    const message = error.response?.data?.error || 'Failed to unlike post';
    throw new Error(message);
  }
}

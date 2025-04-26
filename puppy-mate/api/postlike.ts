// api/postLikes.ts
import axios from 'axios';

// 환경변수에서 BASE_URL을 읽어옴. (없으면 localhost fallback)
const BASE_URL = '';

export async function likePost(postId: number): Promise<void> {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  try {
    await axios.post(`${BASE_URL}/api/posts/${postId}/like`, null, {
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
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  try {
    await axios.delete(`${BASE_URL}/api/posts/${postId}/like`, {
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

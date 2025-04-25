// api/postLikes.ts
import axios from 'axios';

export async function likePost(postId: number): Promise<void> {
  try {
    const token = localStorage.getItem('authToken');
    await axios.post(`/api/posts/${postId}/like`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
    await axios.delete(`/api/posts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error: any) {
    console.error('Failed to unlike post:', error);
    const message = error.response?.data?.error || 'Failed to unlike post';
    throw new Error(message);
  }
}

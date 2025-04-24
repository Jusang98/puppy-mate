import { PostLike } from '../entities/PostLike';

export interface PostLikeRepository {
  // 내가 찜한 게시글 + 썸네일(스냅샷) 리스트
  findLikedPostsWithSnapshot(userId: number): Promise<PostLike[]>;
}

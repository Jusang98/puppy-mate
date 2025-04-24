import { PostLikeRepository } from '@/domain/repositories/PostLikeRepository';
import { createClient } from '@/utils/supabase/server';
import { GetLikedPostWithSnapshotDto } from '@/application/usecases/postlike/dto/GetLikedPostWithSnapshotDto';
import { CoordinateDto } from '@/application/usecases/course/dto/CoordinateDto';

export class SbPostLikeRepository implements PostLikeRepository {
  // 내가 찜한 게시글 + 썸네일(좌표) 리스트
  async findLikedPostsWithSnapshot(
    userId: number
  ): Promise<GetLikedPostWithSnapshotDto[]> {
    const supabase = await createClient();

    try {
      // Supabase의 nested select를 활용한 조인 쿼리
      const { data, error } = await supabase
        .from('post_likes')
        .select(
          `
    post_id,
    posts (
      id,
      title,
      content,
      course_id,
      created_at,
      courses (
        id,
        name,
        address,
        is_public,
        distance,
        duration,
        created_at,
        updated_at,
        course_coordinates (
          id,
          lat,
          lng,
          point_order
        )
      )
    )
  `
        )
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching liked posts with snapshot:', error);
        throw new Error('Failed to fetch liked posts with snapshot');
      }

      if (!data) return [];

      return data.map((item: any) => {
        const post = item.posts;
        const course = post?.courses;
        const coordinates =
          course?.course_coordinates?.map(
            (c: any) => new CoordinateDto(c.lat, c.lng)
          ) ?? [];
        return new GetLikedPostWithSnapshotDto(
          post.id,
          post.title,
          post.content,
          post.course_id,
          coordinates,
          new Date(post.created_at)
        );
      });
    } catch (error) {
      console.error('Error in findLikedPostsWithSnapshot:', error);
      throw error;
    }
  }
}

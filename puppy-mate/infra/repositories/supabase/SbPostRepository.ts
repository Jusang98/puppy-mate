import { Post } from '@/domain/entities/Post';
import { PostRepository } from '@/domain/repositories/PostRepository';
import { createClient } from '@/utils/supabase/server';
import { CoordinateDto } from '@/application/usecases/course/dto/CoordinateDto';
import { GetMyPostsDto } from '@/application/usecases/post/dto/GetMyPostDto';
export class SbPostRepository implements PostRepository {
  async create(post: Post): Promise<number> {
    const supabase = await createClient();

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: post.userId,
          course_id: post.courseId,
          title: post.title,
          content: post.content,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post.');
      }

      return data.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post.');
    }
  }

  async findById(id: number): Promise<Post | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        user_id,
        course_id,
        title,
        content,
        created_at,
        updated_at
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error finding post by ID:', error);
      return null;
    }

    if (!data) return null;

    return new Post(
      data.id,
      data.user_id,
      data.course_id,
      data.title,
      data.content,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  async findByCourseId(courseId: number): Promise<Post[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('course_id', courseId);

    if (error) {
      console.error('Error finding posts by course ID:', error);
      throw new Error('Failed to fetch posts.');
    }

    return data.map((row: any) => {
      return new Post(
        row.id,
        row.user_id,
        row.course_id,
        row.title,
        row.content,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    });
  }

  async findAll(): Promise<Post[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from('posts').select(
      `
        id,
        user_id,
        course_id,
        title,
        content,
        created_at,
        updated_at
      `
    );

    if (error) {
      console.error('Error finding all posts:', error);
      throw new Error('Failed to fetch posts.');
    }

    return data.map((row: any) => {
      return new Post(
        row.id,
        row.user_id,
        row.course_id,
        row.title,
        row.content,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    });
  }

  async findByUserId(userId: number): Promise<Post[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        user_id,
        course_id,
        title,
        content,
        created_at,
        updated_at
      `
      )
      .eq('user_id', userId);

    if (error) {
      console.error('Error finding posts by user ID:', error);
      throw new Error('Failed to fetch posts.');
    }

    return data.map((row: any) => {
      return new Post(
        row.id,
        row.user_id,
        row.course_id,
        row.title,
        row.content,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    });
  }

  async update(id: number, updatedPost: Partial<Post>): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase
      .from('posts')
      .update({
        title: updatedPost.title,
        content: updatedPost.content,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
      return false;
    }

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }

    return true;
  }
  async findMyPostsWithSnapshot(userId: number): Promise<GetMyPostsDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        title,
        content,
        course_id,
        created_at,
        courses (
          distance,
          duration,
          course_coordinates (
            lat,
            lng
          )
        )
      `
      )
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching my posts with snapshot:', error);
      throw new Error('Failed to fetch my posts with snapshot');
    }

    if (!data) return [];

    return data.map((row: any) => {
      const course = row.courses;
      const coordinates =
        course?.course_coordinates?.map(
          (c: any) => new CoordinateDto(c.lat, c.lng)
        ) ?? [];

      // 거리: m → km, 소요시간: ms → 분 변환
      const distance = course
        ? Math.round((course.distance / 1000) * 100) / 100
        : 0;
      const duration = course ? Math.floor(course.duration / 1000 / 60) : 0;

      return new GetMyPostsDto(
        row.id,
        row.title,
        row.content,
        row.course_id,
        coordinates,
        new Date(row.created_at),
        distance,
        duration
      );
    });
  }
}

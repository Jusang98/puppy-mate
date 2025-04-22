import { PostImage } from '@/domain/entities/PostImage';
import { PostImageRepository } from '@/domain/repositories/PostImageRepository';
import { createClient } from '@/utils/supabase/server';

export class SbPostImageRepository implements PostImageRepository {
  async createMany(postImages: PostImage[]): Promise<number[]> {
    const supabase = await createClient();

    try {
      const { data, error } = await supabase
        .from('post_images')
        .insert(
          postImages.map(image => ({
            post_id: image.postId,
            image_url: image.imageUrl,
            order_index: image.orderIndex
          }))
        )
        .select('id');

      if (error) {
        console.error('Error creating post images:', error);
        throw new Error('Failed to create post images');
      }

      return data.map(item => item.id);
    } catch (error) {
      console.error('Error in createMany:', error);
      throw error;
    }
  }
}

import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostDto } from './dto/PostDto';
import { CoordinateRepository } from '@/domain/repositories/CoordinateRepository';
import { PostImageRepository } from '@/domain/repositories/PostImageRepository';
import { StorageRepository } from '@/domain/repositories/StorageRepository';
import { PostLikeRepository } from '@/domain/repositories/PostLikeRepository';

export default class GetPostUsecase {
  private readonly postRepository: PostRepository;
  private readonly coordinateRepository: CoordinateRepository;
  private readonly postImageRepository: PostImageRepository;
  private readonly storageRepository: StorageRepository;
  private readonly postLikeRepository: PostLikeRepository;

  constructor(
    postRepository: PostRepository,
    coordinateRepository: CoordinateRepository,
    postImageRepository: PostImageRepository,
    storageRepository: StorageRepository,
    postLikeRepository: PostLikeRepository
  ) {
    this.postRepository = postRepository;
    this.coordinateRepository = coordinateRepository;
    this.postImageRepository = postImageRepository;
    this.storageRepository = storageRepository;
    this.postLikeRepository = postLikeRepository;
  }

  async execute(id: number, userId: number | null): Promise<PostDto | null> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      return null;
    }

    const coordinates = await this.coordinateRepository.findAllByCourseId(
      post.courseId
    );

    const images = await this.postImageRepository.findByPostId(id);
    let hasLiked = false;
    if (userId) {
      hasLiked = await this.postLikeRepository.hasLiked(userId, id);
    }
    // Get public URLs for all images
    const imagesWithUrls = await Promise.all(
      images.map(async image => ({
        ...image,
        url: await this.storageRepository.getPublicUrl(image.imageUrl)
      }))
    );

    const imageUrls = imagesWithUrls.map(image => image.url);

    return {
      userId: post.userId,
      courseId: post.courseId,
      title: post.title,
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      coordinates: coordinates,
      images: imageUrls,
      hasLiked: hasLiked
    } as PostDto;
  }
}

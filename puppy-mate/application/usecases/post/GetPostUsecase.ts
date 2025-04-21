import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostDto } from './dto/PostDto';
import { CoordinateRepository } from '@/domain/repositories/CoordinateRepository';

export default class GetPostUsecase {
  private readonly postRepository: PostRepository;
  private readonly coordinateRepository: CoordinateRepository;
  constructor(
    postRepository: PostRepository,
    coordinateRepository: CoordinateRepository
  ) {
    this.postRepository = postRepository;
    this.coordinateRepository = coordinateRepository;
  }

  async execute(id: number): Promise<PostDto | null> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      return null;
    }
    const coordinates = await this.coordinateRepository.findAllByCourseId(
      post.courseId
    );

    return {
      userId: post.userId,
      courseId: post.courseId,
      title: post.title,
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      coordinates: coordinates
    } as PostDto;
  }
}

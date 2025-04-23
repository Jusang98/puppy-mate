import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostDto } from './dto/PostDto';
import { CoordinateRepository } from '@/domain/repositories/CoordinateRepository';

// 코스 아이디로 게시물 조회
// 게시물의 정보와 코스의 좌표 정보를 함께 반환
export default class GetPostsByCourseIdUsecase {
  private readonly postRepository: PostRepository;
  private readonly coordinateRepository: CoordinateRepository;
  constructor(postRepository: PostRepository, coordinateRepository: CoordinateRepository) {
    this.postRepository = postRepository;
    this.coordinateRepository = coordinateRepository;
  }

  async execute(id: number): Promise<PostDto[] | null> {
    const posts = await this.postRepository.findByCourseId(id);
    if (!posts) {
      return null;
    }

    const postDtos = await Promise.all(
      posts.map(async (post) => {
        const coordinates = await this.coordinateRepository.findAllByCourseId(post.courseId);
        return {
          userId: post.userId,
          courseId: post.courseId,
          title: post.title,
          id: post.id,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          coordinates: coordinates,
        } as PostDto;
      })
    );

    return postDtos;
  }
}

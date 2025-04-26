import { PostRepository } from '@/domain/repositories/PostRepository';
import { GetMyPostsDto } from './dto/GetMyPostsDto';

export default class GetMyPostsUsecase {
  private readonly postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async execute(userId: number): Promise<GetMyPostsDto[]> {
    // PostRepository의 findByUserId 메서드 사용
    const posts = await this.postRepository.findMyPostsWithSnapshot(userId);
    return posts;
  }
}

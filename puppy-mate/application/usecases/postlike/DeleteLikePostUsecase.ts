import { PostLikeRepository } from '@/domain/repositories/PostLikeRepository';

export default class DeletePostUsecase {
  private readonly postLikeRepository: PostLikeRepository;

  constructor(postLikeRepository: PostLikeRepository) {
    this.postLikeRepository = postLikeRepository;
  }

  async execute(userId: number, postId: number): Promise<boolean> {
    return this.postLikeRepository.delete(userId, postId);
  }
}

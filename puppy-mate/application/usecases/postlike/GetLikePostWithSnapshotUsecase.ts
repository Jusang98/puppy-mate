import { SbPostLikeRepository } from '@/infra/repositories/supabase/SbPostLikeRepository';
import { GetLikedPostWithSnapshotDto } from './dto/GetLikedPostWithSnapshotDto';

export class GetLikedPostsWithSnapshotUseCase {
  constructor(private postLikeRepository: SbPostLikeRepository) {}

  async execute(userId: number): Promise<GetLikedPostWithSnapshotDto[]> {
    const result = await this.postLikeRepository.findLikedPostsWithSnapshot(
      userId
    );
    // coordinates가 잘 들어오는지 로그로 확인
    return result;
  }
}

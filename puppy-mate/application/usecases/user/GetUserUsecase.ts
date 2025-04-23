import { UserRepository } from '@/domain/repositories/UserRepository';
import { StorageRepository } from '@/domain/repositories/StorageRepository';
import { GetUserDto } from './dto/GetUserDto';

export default class GetUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly storageRepository: StorageRepository
  ) {}

  // GetUserUsecase.ts 수정
  async execute(userId: number): Promise<GetUserDto | null> {
    // 1. User 도메인 객체 조회
    const user = await this.userRepository.findById(userId);
    if (!user) return null;

    // 2. User → GetUserDto 변환
    const getUserDto = new GetUserDto(
      user.email,
      user.nickname,
      user.profileImageUrl, // profileImageUrl → profileImage로 매핑
      user.id,
      user.createdAt,
      user.updatedAt
    );

    // 3. 프로필 이미지 URL 처리
    if (getUserDto.profileImage) {
      const publicUrl = await this.storageRepository.getPublicUrl(
        getUserDto.profileImage
      );
      getUserDto.profileImage = publicUrl;
    }

    return getUserDto;
  }
}

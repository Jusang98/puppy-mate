import { UserRepository } from '@/domain/repositories/UserRepository';
import { StorageRepository } from '@/domain/repositories/StorageRepository';
import { User } from '@/domain/entities/User';

export default class GetUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly storageRepository: StorageRepository
  ) {}

  async execute(userId: number): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    if (user.profile_image_url) {
      const publicUrl = await this.storageRepository.getPublicUrl(
        user.profile_image_url
      );
      user.profile_image_url = publicUrl;
    }
    return user;
  }
}

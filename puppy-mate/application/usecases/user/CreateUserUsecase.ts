import { UserRepository } from '@/domain/repositories/UserRepository';
import { ProfileImageRepository } from '@/domain/repositories/ProfileStorageRepository';
import { CreateUserDto } from './dto/CreateUserDto';
import bcrypt from 'bcrypt';
import { User } from '@/domain/entities/User';

export default class CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileImageRepository: ProfileImageRepository
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<{ userId: number }> {
    const { email, password, nickname, profile_image } = createUserDto;

    let fileName: string | undefined;

    // 1. 이미지 파일이 있다면 Supabase에 저장
    if (profile_image) {
      fileName = await this.profileImageRepository.save(profile_image as File);
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. User 객체 생성
    const user: User = {
      email,
      password: hashedPassword,
      nickname,
      profile_image_url: fileName,
    };

    // 4. DB에 저장하고 userId 반환
    const userId = await this.userRepository.create(user);
    return { userId };
  }
}

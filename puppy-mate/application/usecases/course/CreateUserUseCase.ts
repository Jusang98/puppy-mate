import { UserRepository } from '@/domain/repositories/UserRepository';
import { CreateUserDto } from './dto/CreateUserDto';

export default class CreateUserUsecase {
  private readonly userRepository: UserRepository;
  private readonly createUserDto: CreateUserDto;

  constructor(userRepository: UserRepository, createUserDto: CreateUserDto) {
    this.userRepository = userRepository;
    this.createUserDto = createUserDto;
  }

  async execute(): Promise<{ userId: number }> {
    // userRepository.create는 숫자를 반환하므로 userId를 그대로 반환
    const userId = await this.userRepository.create(this.createUserDto);
    return { userId }; // userId를 객체로 감싸서 반환
  }
}

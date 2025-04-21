import { PostRepository } from '@/domain/repositories/PostRepository';
import { CreatePostDto } from '../course/dto/CreatePostDto';
import { CourseRepository } from '@/domain/repositories/CourseRepository';

export default class CreatePostUsecase {
  private readonly postRepository: PostRepository;
  private readonly courseRepository: CourseRepository;

  constructor(
    postRepository: PostRepository,
    courseRepository: CourseRepository
  ) {
    this.postRepository = postRepository;
    this.courseRepository = courseRepository;
    console.log('CourseRepository:', this.courseRepository);
  }

  async execute(createPostDto: CreatePostDto): Promise<{ postId: number }> {
    const postId = await this.postRepository.create(createPostDto);
    await this.courseRepository.updatePublic(createPostDto.courseId, true);
    return { postId: postId };
  }
}

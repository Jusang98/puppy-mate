import { PostRepository } from '@/domain/repositories/PostRepository';

import { CoordinateRepository } from '@/domain/repositories/CoordinateRepository';
import { CourseRepository } from '@/domain/repositories/CourseRepository';
import { PostCourseDto } from './dto/PostCourseDto';
// 코스 아이디로 게시물 조회
// 게시물의 정보와 코스의 좌표 정보를 함께 반환
export default class GetPostsByCourseIdUsecase {
  private readonly postRepository: PostRepository;
  private readonly courseRepository: CourseRepository;
  private readonly coordinateRepository: CoordinateRepository;
  constructor(
    postRepository: PostRepository,
    courseRepository: CourseRepository,
    coordinateRepository: CoordinateRepository
  ) {
    this.postRepository = postRepository;
    this.courseRepository = courseRepository;
    this.coordinateRepository = coordinateRepository;
  }

  async execute(id: number): Promise<PostCourseDto[] | null> {
    const posts = await this.postRepository.findByCourseId(id);
    if (!posts) {
      return null;
    }

    const postDtos = await Promise.all(
      posts.map(async (post) => {
        const course = await this.courseRepository.findById(post.courseId);
        const coordinates = await this.coordinateRepository.findAllByCourseId(post.courseId);

        return {
          userId: post.userId,
          courseId: post.courseId,
          title: post.title,
          id: post.id,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          duration: course.duration,
          distance: course.distance,
          address: course.address,
          coordinates: coordinates,
        } as PostCourseDto;
      })
    );

    return postDtos;
  }
}

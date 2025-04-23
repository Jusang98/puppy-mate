import { CourseRepository } from '@/domain/repositories/CourseRepository';
import { GetMyCoursesDto } from './dto/GetMyCoursesDto';
import { Course } from '@/domain/entities/Course';

export default class GetMyCoursesUsecase {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(userId: number): Promise<GetMyCoursesDto[]> {
    const myCourses: Course[] = await this.courseRepository.findAllByUserId(
      userId
    );

    // 엔티티 배열을 DTO 배열로 변환
    return myCourses.map(
      (course) =>
        new GetMyCoursesDto(
          course.name,
          course.address,
          course.distance,
          course.duration,
          course.isPublic,
          course.createdAt
        )
    );
  }
}

import { CourseRepository } from '@/domain/repositories/CourseRepository';
import { CoordinateRepository } from '@/domain/repositories/CoordinateRepository';
import { GetMyCoursesDto } from './dto/GetMyCoursesDto';
import { Course } from '@/domain/entities/Course';

export default class GetMyCoursesUsecase {
  private readonly courseRepository: CourseRepository;
  private readonly coordinateRepository: CoordinateRepository;

  constructor(
    courseRepository: CourseRepository,
    coordinateRepository: CoordinateRepository
  ) {
    this.courseRepository = courseRepository;
    this.coordinateRepository = coordinateRepository;
  }

  async execute(userId: number): Promise<GetMyCoursesDto[]> {
    const myCourses: Course[] = await this.courseRepository.findAllByUserId(
      userId
    );

    const dtoPromises = myCourses.map(async (course) => {
      const coordinates = await this.coordinateRepository.findAllByCourseId(
        course.id || 0
      );

      const coords = coordinates.map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      }));

      return new GetMyCoursesDto(
        course.id!,
        course.name,
        course.address,
        course.distance,
        course.duration,
        // Math.round((course.distance / 1000) * 100) / 100,
        // Math.floor(course.duration / 1000 / 60),
        coords,
        course.isPublic!,
        course.createdAt!
      );
    });

    return Promise.all(dtoPromises);
  }
}

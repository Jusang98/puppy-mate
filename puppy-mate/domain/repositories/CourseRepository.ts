import { Course } from '../entities/Course';

export interface CourseRepository {
  findInBounds(
    southWestLat: number,
    southWestLng: number,
    northEastLat: number,
    northEastLng: number
  ): Promise<Course[]>;
  findById(id: number): Promise<Course | null>;
  findAllByUserId(userId: number): Promise<Course[]>;
  create(course: Course): Promise<{ id: number }>;
  update(course: Course): Promise<Course>;
  delete(id: number): Promise<void>;
}

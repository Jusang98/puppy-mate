import { Course } from '../entities/Course';
import { CourseView } from '../entities/CourseView';
export interface CourseRepository {
  findInBounds(
    southWestLat: number,
    southWestLng: number,
    northEastLat: number,
    northEastLng: number
  ): Promise<Course[]>;
  findById(id: number): Promise<CourseView>;
  findAllByUserId(userId: number): Promise<Course[]>;
  create(course: Course): Promise<{ id: number }>;
  update(course: Course): Promise<Course>;
  updatePublic(id: number, flag: boolean): Promise<void>;
  delete(id: number): Promise<void>;
  findByIsPublic(): Promise<{ id: number; startPoint: { lat: number; lng: number } }[]>;
}

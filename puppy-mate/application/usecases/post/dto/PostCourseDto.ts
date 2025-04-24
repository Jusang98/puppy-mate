import { CoordinateDto } from '../../course/dto/CoordinateDto';
import { CourseCoordinate } from '@/domain/entities/CourseCoordinate';
import { PostView } from '@/domain/entities/PostView';
import { Post } from '@/domain/entities/Post';

export class PostCourseDto {
  userId: number;
  courseId: number;
  title: string;
  id?: number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  distance?: number;
  duration?: number;
  address?: string;
  coordinates: CoordinateDto[];

  constructor(post: PostView, coordinates: CourseCoordinate[]) {
    this.id = post.id;
    this.userId = post.userId;
    this.courseId = post.courseId;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.distance = post.distance;
    this.duration = post.duration;
    this.address = post.address;
    this.coordinates = coordinates.map((coordinate) => new CoordinateDto(coordinate.lat, coordinate.lng));
  }
}

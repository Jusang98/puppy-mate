import { Course } from './Course';

export class CourseView extends Course {
  constructor(
    userId: number,
    name: string,
    courseImageUrl: string,
    address: string,
    distance: number,
    duration: number,
    public coordinates: { lat: number; lng: number }[], // 좌표 데이터
    id?: number,
    isPublic?: boolean,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(userId, name, courseImageUrl, address, distance, duration, id, isPublic, createdAt, updatedAt);
  }
}

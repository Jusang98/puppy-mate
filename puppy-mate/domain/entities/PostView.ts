export class PostView {
  userId: number;
  courseId: number;
  title: string;
  id?: number;
  content?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  distance?: number;
  duration?: number;
  address?: string;

  constructor(
    id: number,
    userId: number,
    courseId: number,
    title: string,
    content: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    distance: number,
    duration: number,
    address: string
  ) {
    this.id = id;
    this.userId = userId;
    this.courseId = courseId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.distance = distance;
    this.duration = duration;
    this.address = address;
  }
}

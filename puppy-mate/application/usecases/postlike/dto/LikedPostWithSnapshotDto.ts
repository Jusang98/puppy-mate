// dto/postLike/LikedPostWithCoordinatesDto.ts
import { CoordinateDto } from '../../course/dto/CoordinateDto';

export class LikedPostWithCoordinatesDto {
  constructor(
    public postId: number,
    public title: string,
    public content: string,
    public courseId: number,
    public coordinates: CoordinateDto[], 
    public createdAt: Date
  ) {}
}

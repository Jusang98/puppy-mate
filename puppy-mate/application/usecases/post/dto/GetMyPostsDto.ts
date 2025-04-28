import { CoordinateDto } from '../../course/dto/CoordinateDto';

export class GetMyPostsDto {
  constructor(
    public postId: number,
    public title: string,
    public content: string,
    public address: string,
    public courseId: number,
    public coordinates: CoordinateDto[],
    public createdAt: Date,
    public distance: number,
    public duration: number
  ) {}
}

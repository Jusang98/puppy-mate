import { CoordinateDto } from './CoordinateDto';

export class CreateCourseDto {
  constructor(
    public userId: number,
    public name: string,
    public courseImageUrl: string,
    public address: string,
    public distance: number,
    public duration: number,
    public coordinates: CoordinateDto[]
  ) {}
}

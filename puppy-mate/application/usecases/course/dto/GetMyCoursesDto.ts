export class GetMyCoursesDto {
  constructor(
    public name: string,
    public address: string,
    public distance: number,
    public duration: number,
    public isPublic?: boolean,
    public createdAt?: Date
  ) {}
}

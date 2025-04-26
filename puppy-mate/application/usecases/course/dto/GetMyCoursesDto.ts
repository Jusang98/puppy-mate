export class GetMyCoursesDto {
  constructor(
    public id: number, // ← 추가
    public name: string,
    public address: string,
    public distance: number,
    public duration: number,
    public coordinates: { lat: number; lng: number }[],
    public isPublic: boolean,
    public createdAt: Date
  ) {}
}

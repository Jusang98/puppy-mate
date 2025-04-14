export class CourseCoordinate {
  constructor(
    private readonly id: number,
    private readonly routeId: number,
    private lat: number,
    private lng: number,
    private pointOrder: number
  ) {}
}

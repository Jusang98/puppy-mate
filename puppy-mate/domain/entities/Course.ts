export class Course {
  constructor(
    private readonly id: number,
    private readonly userId: number,
    private name: string,
    private courseImageUrl: string,
    private address: string,
    private isPublic: boolean,
    private distance: number,
    private duration: number,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}
}

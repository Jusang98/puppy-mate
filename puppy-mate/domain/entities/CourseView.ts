export class CourseView {
  constructor(
    public userId: number,
    public name: string,
    public address: string,
    public distance: number,
    public duration: number,
    public id: number,
    public isPublic: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.userId = userId;
    this.name = name;
    this.address = address;
    this.distance = distance;
    this.duration = duration;
    this.id = id;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

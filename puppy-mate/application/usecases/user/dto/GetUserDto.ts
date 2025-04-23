export class GetUserDto {
  constructor(
    public email: string,
    public nickname: string,
    public profileImage?: string,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

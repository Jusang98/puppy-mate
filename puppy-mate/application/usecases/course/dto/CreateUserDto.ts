export class CreateUserDto {
  constructor(
    public email: string,
    public password: string,
    public nickname: string,
    public profileImageUrl?: string,
    public id?: number, 
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

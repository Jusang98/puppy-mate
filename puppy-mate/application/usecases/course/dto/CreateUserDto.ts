export class CreateUserDto {
  constructor(
    public email: string,
    public password: string,
    public nickname: string,
    public profileImageUrl?: string,
    public id?: number, // 선택적으로 설정
    public createdAt?: Date, // 선택적으로 설정
    public updatedAt?: Date
  ) {}
}

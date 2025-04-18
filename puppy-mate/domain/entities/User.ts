export class User {
  constructor(
    public readonly id: number,
    public email: string,
    public password: string,
    public nickname: string,
    public profileImageUrl: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}

export class User {
  constructor(
    private readonly id: number,
    private email: string,
    private password: string,
    private nickname: string,
    private profileImageUrl: string,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}
}

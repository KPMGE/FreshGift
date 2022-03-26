export interface GetUserRepository {
  get(userId: string): Promise<User>
}

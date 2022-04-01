export interface CheckAccountByEmailRepository {
  check(email: string): Promise<boolean>
}

import { GetUserRepository } from "../../../../../src/data/contracts/user"
import { User } from "../../../../../src/domain/entities"

export class GetUserRepositorySpy implements GetUserRepository {
  userId: string = 'any_user_id'
  output: User = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_valid@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password',
    userName: 'any_username',
    savedGifts: []
  }

  async get(userId: string): Promise<User> {
    this.userId = userId
    return this.output
  }
}

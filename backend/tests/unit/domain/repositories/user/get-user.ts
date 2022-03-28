import { GetUserRepository } from "../../../../../src/data/contracts/user"
import { UserDTO } from "../../../../../src/data/DTO"

export class GetUserRepositorySpy implements GetUserRepository {
  userId: string = 'any_user_id'
  output?: UserDTO = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_valid@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password',
    userName: 'any_username',
    savedGifts: []
  }

  async get(userId: string): Promise<UserDTO | undefined> {
    this.userId = userId
    return this.output
  }
}

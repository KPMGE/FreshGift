import { ListUsersRepository } from "../../../../../src/data/contracts/user/list-users-repository"
import { ListUser } from "../../../../../src/domain/useCases/user"

export class ListUsersRepositorySpy implements ListUsersRepository {
  callsCount = 0
  users: ListUser.Result[] = [
    {
      id: 'any_user_id',
      name: 'any_user_name',
      userName: 'any_user_name',
      email: 'any_valid_email@gmail.com',
      savedGifts: []
    }
  ]

  async list(): Promise<ListUser.Result[]> {
    this.callsCount++
    return this.users
  }
}

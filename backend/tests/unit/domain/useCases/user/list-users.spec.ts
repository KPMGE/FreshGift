import { ListUsersRepository } from "../../../../../src/data/contracts/user/list-users-repository"
import { ListUsersService } from "../../../../../src/data/services/user"
import { ListUser } from "../../../../../src/domain/useCases/user"

class ListUsersRepositoryMock implements ListUsersRepository {
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



type SutTypes = {
  sut: ListUsersService,
  repositoryMock: ListUsersRepositoryMock
}

const makeSut = (): SutTypes => {
  const repositoryMock = new ListUsersRepositoryMock()
  const sut = new ListUsersService(repositoryMock)

  return {
    sut,
    repositoryMock
  }
}

describe('list-users', () => {
  it('should call repository only once', async () => {
    const { sut, repositoryMock } = makeSut()

    await sut.execute()

    expect(repositoryMock.callsCount).toBe(1)
  })

  it('should return and empty array if there is no users in the repository', async () => {
    const { sut, repositoryMock } = makeSut()
    repositoryMock.users = []

    const users = await sut.execute()

    expect(users).toEqual([])
  })

  it('should return a list of valid users', async () => {
    const { sut } = makeSut()

    const users = await sut.execute()

    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('email')
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('userName')
    expect(users[0]).toHaveProperty('savedGifts')
  })
})

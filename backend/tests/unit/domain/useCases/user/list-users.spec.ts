import { GiftDTO } from "../../../../../src/data/DTO"


namespace ListUser {
  export type Result = {
    id: string
    name: string
    email: string
    userName: string
    savedGifts: GiftDTO[]
  }
}

interface ListUser {
  execute(): Promise<ListUser.Result[]>
}

interface ListUsersRepository {
  list(): Promise<ListUser.Result[]>
}


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

class ListUsersService implements ListUser {
  constructor(private readonly listUsersRepository: ListUsersRepository) { }

  async execute(): Promise<ListUser.Result[]> {
    return await this.listUsersRepository.list()
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
})

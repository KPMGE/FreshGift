interface ListUser {
  execute(): Promise<void>
}

interface ListUsersRepository {
  list(): Promise<void>
}


class ListUsersRepositoryMock implements ListUsersRepository {
  callsCount = 0

  async list(): Promise<void> {
    this.callsCount++
  }
}


class ListUsersService implements ListUser {
  constructor(private readonly listUsersRepository: ListUsersRepository) { }

  async execute(): Promise<void> {
    await this.listUsersRepository.list()
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
})

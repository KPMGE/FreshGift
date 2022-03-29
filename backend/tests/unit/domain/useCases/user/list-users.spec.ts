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
  constructor(private readonly listUsersRepository: ListUsersRepositoryMock) { }

  async execute(): Promise<void> {
    await this.listUsersRepository.list()
  }
}

describe('list-users', () => {
  it('should call repository only once', async () => {
    const repository = new ListUsersRepositoryMock()
    const sut = new ListUsersService(repository)

    await sut.execute()

    expect(repository.callsCount).toBe(1)
  })
})

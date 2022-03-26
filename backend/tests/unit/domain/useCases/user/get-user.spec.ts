class GetUserRepositoryMock {
  userId: string = 'any_user_id'

  async get(userId: string): Promise<void> {
    this.userId = userId
  }
}

class GetUserService {
  constructor(private readonly getUserRepository: GetUserRepositoryMock) { }

  async execute(userId: string): Promise<void> {
    this.getUserRepository.get(userId)
  }
}

describe('get-user', () => {
  const userId = 'any_user_id'

  it('should call repository with right id', async () => {
    const getUserRepositoryMock = new GetUserRepositoryMock()
    const sut = new GetUserService(getUserRepositoryMock)

    await sut.execute(userId)

    expect(getUserRepositoryMock.userId).toBe(userId)
  })
})

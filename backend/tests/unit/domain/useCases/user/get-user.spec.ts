interface GetUser {
  execute(userId: string): Promise<void>
}

interface GetUserRepository {
  get(userId: string): Promise<void>
}

class GetUserRepositoryMock implements GetUserRepository {
  userId: string = 'any_user_id'

  async get(userId: string): Promise<void> {
    this.userId = userId
  }
}

class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepositoryMock) { }

  async execute(userId: string): Promise<void> {
    this.getUserRepository.get(userId)
  }
}

type SutTypes = {
  sut: GetUserService,
  getUserRepositoryMock: GetUserRepositoryMock
}

const makeSut = (): SutTypes => {
  const getUserRepositoryMock = new GetUserRepositoryMock()
  const sut = new GetUserService(getUserRepositoryMock)

  return {
    sut,
    getUserRepositoryMock
  }
}

describe('get-user', () => {
  const userId = 'any_user_id'

  it('should call repository with right id', async () => {
    const { sut, getUserRepositoryMock } = makeSut()

    await sut.execute(userId)

    expect(getUserRepositoryMock.userId).toBe(userId)
  })
})

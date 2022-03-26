import { User } from "../../../../../src/domain/entities"

interface GetUser {
  execute(userId: string): Promise<User>
}

interface GetUserRepository {
  get(userId: string): Promise<User>
}

class GetUserRepositorySpy implements GetUserRepository {
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

class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepositorySpy) { }

  async execute(userId: string): Promise<User> {
    return this.getUserRepository.get(userId)
  }
}

type SutTypes = {
  sut: GetUserService,
  getUserRepositorySpy: GetUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const getUserRepositorySpy = new GetUserRepositorySpy()
  const sut = new GetUserService(getUserRepositorySpy)

  return {
    sut,
    getUserRepositorySpy
  }
}

describe('get-user', () => {
  const fakeUser: User = {
    id: 'any_user_id',
    name: 'any_name',
    email: 'any_valid@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password',
    userName: 'any_username',
    savedGifts: []
  }

  it('should call repository with right id', async () => {
    const { sut, getUserRepositorySpy } = makeSut()

    await sut.execute(fakeUser.id)

    expect(getUserRepositorySpy.userId).toBe(fakeUser.id)
  })


  it('should return a valid user', async () => {
    const { sut, getUserRepositorySpy } = makeSut()

    const user = await sut.execute(fakeUser.id)

    expect(getUserRepositorySpy.output).toBe(user)
  })
})

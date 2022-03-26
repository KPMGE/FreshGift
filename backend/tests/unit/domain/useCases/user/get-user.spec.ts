import { GetUserRepository } from "../../../../../src/data/contracts/user"
import { GetUserService } from "../../../../../src/data/services/user/get-user"
import { User } from "../../../../../src/domain/entities"
import { MissingParameterError } from "../../../../../src/domain/errors"

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

  it('should throw an error if no userId is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.execute('')

    await expect(promise).rejects.toThrowError(new MissingParameterError('userId'))
  })
})

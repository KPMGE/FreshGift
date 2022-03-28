import { GetUserService } from "../../../../../src/data/services/user/get-user"
import { MissingParameterError } from "../../../../../src/domain/errors"
import { GetUserRepositorySpy } from "../../repositories/user/get-user"

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
  const fakeUserId = 'any_user_id'

  it('should call repository with right id', async () => {
    const { sut, getUserRepositorySpy } = makeSut()

    await sut.execute(fakeUserId)

    expect(getUserRepositorySpy.userId).toBe(fakeUserId)
  })

  it('should return null if invalid id is provided', async () => {
    const { sut, getUserRepositorySpy } = makeSut()

    getUserRepositorySpy.output = undefined

    const user = await sut.execute('invali_user_id')

    expect(user).toBe(null)
  })

  it('should return a valid user', async () => {
    const { sut } = makeSut()

    const user = await sut.execute(fakeUserId)

    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('userName')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('savedGifts')
  })

  it('should throw an error if no userId is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.execute('')

    await expect(promise).rejects.toThrowError(new MissingParameterError('userId'))
  })
})

import { GetUserService } from "../../../../src/data/services/user/get-user"
import { MissingParameterError } from "../../../../src/domain/errors"
import { GetUser } from "../../../../src/domain/useCases/user"
import { FakeGetUserReposioty, FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class GetUserController implements Controller {
  constructor(private readonly getUserService: GetUser) { }

  async handle(req?: HttpRequest): Promise<HttpResponse<GetUserService.Result>> {
    try {
      const foundUser = await this.getUserService.execute(req?.params.userId)
      return ok(foundUser)
    } catch (error) {
      if (error instanceof MissingParameterError) return resourceNotFoundError(error.message)
      return serverError(error as Error)
    }
  }
}

type SutTypes = {
  sut: GetUserController
}

const makeSut = (): SutTypes => {
  const repo = new FakeGetUserReposioty()
  const service = new GetUserService(repo)
  const sut = new GetUserController(service)
  return {
    sut
  }
}

describe('get-user', () => {
  beforeAll(async () => {
    const registerUser = new FakeRegisterUserRepository()
    await registerUser.register({
      id: 'any_id',
      name: 'any_name',
      email: 'any_valid_email',
      password: 'any_password',
      confirmPassword: 'any_password',
      userName: 'any_username',
      savedGifts: []
    })
  })

  const fakeUserId = 'any_id'
  const fakeRequest: HttpRequest = {
    params: {
      userId: fakeUserId
    }
  }

  it('should return a valid user', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(200)
    expect(response.data).toBeTruthy()
  })

  it('should return badRequest if no userId is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: userId')
  })
})

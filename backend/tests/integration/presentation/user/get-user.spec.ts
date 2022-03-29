import { GetUserService } from "../../../../src/data/services/user/get-user"
import { GetUser } from "../../../../src/domain/useCases/user"
import { FakeGetUserReposioty, FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpRequest, HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class GetUserController implements Controller {
  constructor(private readonly getUserService: GetUser) { }

  async handle(req?: HttpRequest): Promise<HttpResponse<GetUserService.Result>> {
    const foundUser = await this.getUserService.execute(req?.params.userId)
    return ok(foundUser)
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

    const user = await sut.handle(fakeRequest)

    expect(user.statusCode).toBe(200)
    expect(user.data).toBeTruthy()
  })
})

import { RegisterUserService } from "../../../../src/data/services/user"
import { RegisterUser } from "../../../../src/domain/useCases/user"
import { FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpRequest, HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { RandomIdGeneratorProviderStub } from "../../../unit/domain/providers"
import { TokenGeneratorProviderSpy } from "../../../unit/domain/providers/token-generator"

class RegisterUserController implements Controller {
  constructor(private readonly registerUserService: RegisterUser) { }

  async handle(req?: HttpRequest<RegisterUserService.Props>): Promise<HttpResponse<string>> {
    const registeredUser = await this.registerUserService.execute(req?.body)
    return ok(registeredUser)
  }
}

type SutTypes = {
  sut: RegisterUserController
}

const makeSut = (): SutTypes => {
  const repo = new FakeRegisterUserRepository()
  const idGenerator = new RandomIdGeneratorProviderStub()
  const tokenGenerator = new TokenGeneratorProviderSpy()
  const service = new RegisterUserService(repo, idGenerator, tokenGenerator)
  const sut = new RegisterUserController(service)

  return {
    sut
  }
}

describe('register-user-controller', () => {
  const fakeNewUser: RegisterUserService.Props = {
    name: 'any_user_name',
    email: 'any_valid_email@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password',
    userName: 'any_username'
  }
  const fakeRequest: HttpRequest<RegisterUserService.Props> = {
    body: fakeNewUser
  }

  it('should return a HttpResonse with a valid token', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(200)
    expect(response.data).toBeTruthy()
  })
})

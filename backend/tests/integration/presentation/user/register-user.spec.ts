import { RegisterUserService } from "../../../../src/data/services/user"
import { MissingParameterError } from "../../../../src/domain/errors"
import { RegisterUser } from "../../../../src/domain/useCases/user"
import { FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { RandomIdGeneratorProviderStub } from "../../../unit/domain/providers"
import { TokenGeneratorProviderSpy } from "../../../unit/domain/providers/token-generator"

class RegisterUserController implements Controller {
  constructor(private readonly registerUserService: RegisterUser) { }

  async handle(req?: HttpRequest<RegisterUserService.Props>): Promise<HttpResponse<string>> {
    try {
      const registeredUser = await this.registerUserService.execute(req?.body)
      return ok(registeredUser)
    } catch (error) {
      if (error instanceof MissingParameterError) return badRequest(error.message)
      return serverError(error as Error)
    }
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

  it('should return a badRequest if no name is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      ...fakeRequest, body: {
        ...fakeNewUser,
        name: ''
      }
    })

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: name')
  })

  it('should return a badRequest if no userName is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      ...fakeRequest, body: {
        ...fakeNewUser,
        userName: ''
      }
    })

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: userName')
  })

  it('should return a badRequest if no password is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      ...fakeRequest, body: {
        ...fakeNewUser,
        password: ''
      }
    })

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: password')
  })


  it('should return a badRequest if no confirmPassword is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      ...fakeRequest, body: {
        ...fakeNewUser,
        confirmPassword: ''
      }
    })

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: confirmPassword')
  })
})

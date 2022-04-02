import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { serverError, unauthorized } from "../../../src/presentation/helpers"

class AuthenticatorSpy implements AuthenticationUseCase {
  input
  output = {
    name: 'any_name',
    accessToken: 'any_access_token'
  }
  async execute(input: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    this.input = input
    return this.output
  }
}

class SignUpController implements Controller {
  constructor(private readonly authenticator: AuthenticationUseCase) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const isAuthorized = await this.authenticator.execute(request)
      if (!isAuthorized) return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: SignUpController,
  authenticatorSpy: AuthenticatorSpy
}

const makeSut = (): SutTypes => {
  const authenticatorSpy = new AuthenticatorSpy()
  const sut = new SignUpController(authenticatorSpy)

  return {
    sut,
    authenticatorSpy
  }
}

describe('sign-up-controller', () => {
  const fakeRequest = {
    email: 'any_valid_email@gmail.com',
    password: 'any_password'
  }

  it('should call authenticator with correct data', async () => {
    const { sut, authenticatorSpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(authenticatorSpy.input).toEqual(fakeRequest)
  })

  it('should return unauthorized if wrong credentials are provided', async () => {
    const { sut, authenticatorSpy } = makeSut()
    authenticatorSpy.output = null
    const httpRespose = await sut.handle(fakeRequest)
    expect(httpRespose).toEqual(unauthorized())
  })

  it('should return serverError if authenticator throws', async () => {
    const { sut, authenticatorSpy } = makeSut()
    authenticatorSpy.execute = () => { throw new Error() }
    const httpRespose = await sut.handle(fakeRequest)
    expect(httpRespose).toEqual(serverError(new Error()))
  })
})

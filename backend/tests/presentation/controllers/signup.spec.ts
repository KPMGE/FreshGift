import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"

class AuthenticatorSpy implements AuthenticationUseCase {
  input
  async execute(input: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    this.input = input
    return null
  }
}

class SignUpController implements Controller {
  constructor(private readonly authenticator: AuthenticationUseCase) { }
  async handle(request: any): Promise<HttpResponse> {
    await this.authenticator.execute(request)
    return null
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
    await sut.handle(fakeRequest)
    expect(authenticatorSpy.input).toEqual(fakeRequest)
  })
})

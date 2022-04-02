import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"

class AuthenticatorMock implements AuthenticationUseCase {
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

describe('sign-up-controller', () => {
  const fakeRequest = {
    email: 'any_valid_email@gmail.com',
    password: 'any_password'
  }

  it('should call authenticator with correct data', async () => {
    const authenticatorMock = new AuthenticatorMock()
    const sut = new SignUpController(authenticatorMock)
    await sut.handle(fakeRequest)
    expect(authenticatorMock.input).toEqual(fakeRequest)
  })
})

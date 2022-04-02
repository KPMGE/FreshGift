import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/contracts"
import { ok, serverError, unauthorized } from "../../../src/presentation/helpers"

class ValidatorMock implements Validator {
  input
  validate(input: any): Error {
    this.input = input
    return null
  }
}

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

class LoginCtontroller implements Controller {
  constructor(
    private readonly authenticator: AuthenticationUseCase,
    private readonly validator: Validator
  ) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const auth = await this.authenticator.execute(request)
      if (!auth) return unauthorized()
      this.validator.validate(request)
      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: LoginCtontroller,
  authenticatorSpy: AuthenticatorSpy,
  validatorMock: ValidatorMock
}

const makeSut = (): SutTypes => {
  const authenticatorSpy = new AuthenticatorSpy()
  const validatorMock = new ValidatorMock()
  const sut = new LoginCtontroller(authenticatorSpy, validatorMock)

  return {
    sut,
    authenticatorSpy,
    validatorMock
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

  it('should return ok if valid data is given', async () => {
    const { sut, authenticatorSpy } = makeSut()
    const httpRespose = await sut.handle(fakeRequest)
    expect(httpRespose).toEqual(ok(authenticatorSpy.output))
  })

  it('should call validator with right data', async () => {
    const { sut, validatorMock } = makeSut()
    await sut.handle(fakeRequest)
    expect(validatorMock.input).toEqual(fakeRequest)
  })
})

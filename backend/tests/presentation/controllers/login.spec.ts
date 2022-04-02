import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/contracts"
import { badRequest, ok, serverError, unauthorized } from "../../../src/presentation/helpers"
import { AuthenticatorSpy, ValidatorSpy } from "./mocks"

class LoginCtontroller implements Controller {
  constructor(
    private readonly authenticator: AuthenticationUseCase,
    private readonly validator: Validator
  ) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const auth = await this.authenticator.execute(request)
      if (!auth) return unauthorized()
      const error = this.validator.validate(request)
      if (error) return badRequest(error)
      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: LoginCtontroller,
  authenticatorSpy: AuthenticatorSpy,
  validatorSpy: ValidatorSpy
}

const makeSut = (): SutTypes => {
  const authenticatorSpy = new AuthenticatorSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new LoginCtontroller(authenticatorSpy, validatorSpy)

  return {
    sut,
    authenticatorSpy,
    validatorSpy
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
    const { sut, validatorSpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(validatorSpy.input).toEqual(fakeRequest)
  })

  it('should return badRequest if validator returns an error', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.output = new Error()
    const httpRespose = await sut.handle(fakeRequest)
    expect(httpRespose).toEqual(badRequest(new Error()))
  })
})

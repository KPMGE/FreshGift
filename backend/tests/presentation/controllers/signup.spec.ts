import { AddAccountUseCase } from "../../../src/domain/useCases"
import { SignUpController } from "../../../src/presentation/controllers/account/signup"
import { EmailInUseError, MissingParamError } from "../../../src/presentation/errors"
import { badRequest, forbidden, serverError } from "../../../src/presentation/helpers"
import { AuthenticatorSpy, ValidatorSpy } from "./mocks"

type SutTypes = {
  sut: SignUpController,
  addAccountServiceSpy: AddAccountServiceSpy,
  authenticatorSpy: AuthenticatorSpy,
  validatorSpy: ValidatorSpy
}

class AddAccountServiceSpy implements AddAccountUseCase {
  input: AddAccountUseCase.Props
  output: boolean = true
  async execute(account: AddAccountUseCase.Props): Promise<boolean> {
    this.input = account
    return this.output
  }
}

const makeSut = (): SutTypes => {
  const addAccountServiceSpy = new AddAccountServiceSpy()
  const authenticatorSpy = new AuthenticatorSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new SignUpController(addAccountServiceSpy, authenticatorSpy, validatorSpy)
  return {
    sut,
    addAccountServiceSpy,
    authenticatorSpy,
    validatorSpy
  }
}

describe('sign-up', () => {
  const fakeRequest = {
    name: 'any_name',
    email: 'any_valid_email@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }

  it('should return serverError if addAccountService throws', async () => {
    const { sut, addAccountServiceSpy } = makeSut()
    addAccountServiceSpy.execute = () => { throw new Error() }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call AddAccountService with right data', async () => {
    const { sut, addAccountServiceSpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(addAccountServiceSpy.input).toEqual({
      name: fakeRequest.name,
      password: fakeRequest.password,
      email: fakeRequest.email
    })
  })

  it('should return forbidden if addAccountService returns false', async () => {
    const { sut, addAccountServiceSpy } = makeSut()
    addAccountServiceSpy.output = false
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('should return forbidden if addAccountService returns false', async () => {
    const { sut, addAccountServiceSpy } = makeSut()
    addAccountServiceSpy.output = false
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('should call authenticator with right data', async () => {
    const { sut, authenticatorSpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(authenticatorSpy.input).toEqual({
      email: fakeRequest.email,
      password: fakeRequest.password
    })
  })

  it('should call validator with right data', async () => {
    const { sut, validatorSpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(validatorSpy.input).toEqual(fakeRequest)
  })

  it('should return badRequest if validator returns error', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.validate = () => { return new MissingParamError('some_param') }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('some_param')))
  })

  it('should return authenticatedUser and status 200', async () => {
    const { sut, authenticatorSpy } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(authenticatorSpy.output)
  })
})

import { AddAccountRepository } from "../../../src/data/contracts"
import { AuthenticationUseCase } from "../../../src/domain/useCases"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/contracts"
import { EmailInUseError, MissingParamError } from "../../../src/presentation/errors"
import { badRequest, forbidden, serverError } from "../../../src/presentation/helpers"
import { AuthenticatorSpy, ValidatorSpy } from "./mocks"

namespace SignUpController {
  export type Props = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
}

class AddAccountRepositorySpy implements AddAccountRepository {
  input
  output = true
  async add(account: AddAccountRepository.Props): Promise<boolean> {
    this.input = account
    return this.output
  }
}

class SignUpController implements Controller {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly authenticator: AuthenticationUseCase,
    private readonly validator: Validator
  ) { }
  async handle({ name, email, password, confirmPassword }: SignUpController.Props): Promise<HttpResponse> {
    try {
      const wasAccountAdded = await this.addAccountRepository.add({ name, email, password })
      if (!wasAccountAdded) return forbidden(new EmailInUseError())
      const error = this.validator.validate({ name, email, password, confirmPassword })
      if (error) return badRequest(error)
      await this.authenticator.execute({ email, password })
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: SignUpController,
  addAccountRepositorySpy: AddAccountRepositorySpy
  authenticatorSpy: AuthenticatorSpy,
  validatorSpy: ValidatorSpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const authenticatorSpy = new AuthenticatorSpy()
  const validatorSpy = new ValidatorSpy()
  const sut = new SignUpController(addAccountRepositorySpy, authenticatorSpy, validatorSpy)
  return {
    sut,
    addAccountRepositorySpy,
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

  it('should return serverError if addAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.add = () => { throw new Error() }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call AddAccountRepository with right data', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    await sut.handle(fakeRequest)
    expect(addAccountRepositorySpy.input).toEqual({
      name: fakeRequest.name,
      password: fakeRequest.password,
      email: fakeRequest.email
    })
  })

  it('should return forbidden if addAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.output = false
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('should return forbidden if addAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.output = false
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
})

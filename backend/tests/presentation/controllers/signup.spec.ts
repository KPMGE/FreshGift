import { AddAccountRepository } from "../../../src/data/contracts"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { EmailInUseError } from "../../../src/presentation/errors"
import { forbidden, serverError } from "../../../src/presentation/helpers"

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
  constructor(private readonly addAccountRepository: AddAccountRepository) { }
  async handle({ name, email, password, confirmPassword }: SignUpController.Props): Promise<HttpResponse> {
    try {
      const wasAccountAdded = await this.addAccountRepository.add({
        name,
        email,
        password
      })
      if (!wasAccountAdded) return forbidden(new EmailInUseError())
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: SignUpController,
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new SignUpController(addAccountRepositorySpy)
  return {
    sut,
    addAccountRepositorySpy
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

  it('should return forbidden if addAccountRepository false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.output = false
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})

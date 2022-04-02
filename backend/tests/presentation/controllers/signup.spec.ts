import { AddAccountRepository } from "../../../src/data/contracts"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { serverError } from "../../../src/presentation/helpers"

namespace SignUpController {
  export type Props = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
}

class AddAccountRepositoryMock implements AddAccountRepository {
  input
  async add(account: AddAccountRepository.Props): Promise<boolean> {
    this.input = account
    return null
  }
}

class SignUpController implements Controller {
  constructor(private readonly addAccountRepository: AddAccountRepository) { }
  async handle({ name, email, password, confirmPassword }: SignUpController.Props): Promise<HttpResponse> {
    try {
      await this.addAccountRepository.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: SignUpController,
  addAccountRepositoryMock: AddAccountRepositoryMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRepositoryMock()
  const sut = new SignUpController(addAccountRepositoryMock)
  return {
    sut,
    addAccountRepositoryMock
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
    const { sut, addAccountRepositoryMock } = makeSut()
    addAccountRepositoryMock.add = () => { throw new Error() }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call AddAccountRepository with right data', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    await sut.handle(fakeRequest)
    expect(addAccountRepositoryMock.input).toEqual({
      name: fakeRequest.name,
      password: fakeRequest.password,
      email: fakeRequest.email
    })
  })
})

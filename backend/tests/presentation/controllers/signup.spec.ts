import { AddAccountRepository } from "../../../src/data/contracts"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"

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
    await this.addAccountRepository.add({
      name,
      email,
      password
    })
    return null
  }
}

describe('sign-up', () => {
  const fakeRequest = {
    name: 'any_name',
    email: 'any_valid_email@gmail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }

  it('should call AddAccountRepository with right data', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    const sut = new SignUpController(addAccountRepositoryMock)
    await sut.handle(fakeRequest)
    expect(addAccountRepositoryMock.input).toEqual({
      name: fakeRequest.name,
      password: fakeRequest.password,
      email: fakeRequest.email
    })
  })
})

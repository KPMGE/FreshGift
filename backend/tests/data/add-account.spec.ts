interface AddAccountUseCase {
  execute(account: { name: string, email: string, password: string }): Promise<void>
}

class AddAccountRespositoryMock {
  input: any

  async add(account: { name: string, email: string, password: string }): Promise<void> {
    this.input = account
  }
}

class AddAccountService {
  constructor(private readonly addAccountRepository: AddAccountRespositoryMock) { }
  async execute(account: { name: string, email: string, password: string }): Promise<void> {
    await this.addAccountRepository.add(account)
  }
}

describe('add-account', () => {
  const fakeAccount = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }

  it('should call addAccountRepository with correct data', async () => {
    const addAccountRepositoryMock = new AddAccountRespositoryMock()
    const sut = new AddAccountService(addAccountRepositoryMock)

    await sut.execute(fakeAccount)

    expect(addAccountRepositoryMock.input).toEqual(fakeAccount)
  })
})

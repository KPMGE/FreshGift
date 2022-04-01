class LoadAccountByEmailRepositoryMock {
  input?: string
  async load(email: string): Promise<void> {
    this.input = email
  }
}

class AuthenticationService {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepositoryMock) { }
  async execute(email: string): Promise<void> {
    await this.loadAccountByEmailRepository.load(email)
  }
}

describe('authentication', () => {
  const fakeInput = {
    email: 'any_email@gmail.com',
    password: 'any_password'
  }

  it('should call LoadAccountByEmailRepository with right data', async () => {
    const repositoryMock = new LoadAccountByEmailRepositoryMock()
    const sut = new AuthenticationService(repositoryMock)

    await sut.execute(fakeInput.email)

    expect(repositoryMock.input).toBe(fakeInput.email)
  })
})

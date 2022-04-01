namespace AuthenticationUseCase {
  export type Props = {
    password: string
    email: string
  }
}

interface AuthenticationUseCase {
  execute(input: AuthenticationUseCase.Props): Promise<void>
}

interface LoadAccountByEmailRepository {
  load(email: string): Promise<void>
}

class LoadAccountByEmailRepositoryMock implements LoadAccountByEmailRepository {
  input?: string
  async load(email: string): Promise<void> {
    this.input = email
  }
}

class AuthenticationService {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }
  async execute({ email }: AuthenticationUseCase.Props): Promise<void> {
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

    await sut.execute(fakeInput)

    expect(repositoryMock.input).toBe(fakeInput.email)
  })
})

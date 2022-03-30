namespace AddAccountUseCase {
  export type Props = {
    name: string,
    email: string,
    password: string
  }
}

interface AddAccountUseCase {
  execute(account: AddAccountUseCase.Props): Promise<boolean>
}

interface AddAccountRepository {
  add(account: AddAccountUseCase.Props): Promise<void>
}

interface Hasher {
  hash(plainText: string): Promise<void>
}

interface CheckAccountByEmailRepository {
  check(email: string): Promise<void>
}

class AddAccountRespositoryMock implements AddAccountRepository {
  input: any

  async add(account: AddAccountUseCase.Props): Promise<void> {
    this.input = account
  }
}

class HasherMock implements Hasher {
  input?: string

  async hash(plainText: string): Promise<void> {
    this.input = plainText
  }
}

class CheckAccountByEmailRepositoryMock implements CheckAccountByEmailRepository {
  input?: string
  async check(email: string): Promise<void> {
    this.input = email
  }
}

class AddAccountService implements AddAccountUseCase {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }
  async execute(account: AddAccountUseCase.Props): Promise<boolean> {
    await this.addAccountRepository.add(account)
    await this.hasher.hash(account.password)
    await this.checkAccountByEmailRepository.check(account.email)
    return true
  }
}

type SutTypes = {
  sut: AddAccountService,
  addAccountRepositoryMock: AddAccountRespositoryMock,
  hasherMock: HasherMock
  checkAccountByEmailRepositoryMock: CheckAccountByEmailRepositoryMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRespositoryMock()
  const hasherMock = new HasherMock()
  const checkAccountByEmailRepositoryMock = new CheckAccountByEmailRepositoryMock()
  const sut = new AddAccountService(addAccountRepositoryMock, hasherMock, checkAccountByEmailRepositoryMock)

  return {
    sut,
    hasherMock,
    addAccountRepositoryMock,
    checkAccountByEmailRepositoryMock
  }
}

describe('add-account', () => {
  const fakeAccount = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }

  it('should call addAccountRepository with correct data', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    await sut.execute(fakeAccount)
    expect(addAccountRepositoryMock.input).toEqual(fakeAccount)
  })

  it('should call Hasher with correct data', async () => {
    const { sut, hasherMock } = makeSut()
    await sut.execute(fakeAccount)
    expect(hasherMock.input).toBe(fakeAccount.password)
  })

  it('should call CheckAccountByEmailRepository with correct data', async () => {
    const { sut, checkAccountByEmailRepositoryMock } = makeSut()
    await sut.execute(fakeAccount)
    expect(checkAccountByEmailRepositoryMock.input).toBe(fakeAccount.email)
  })

  it('should true on success', async () => {
    const { sut } = makeSut()
    const wasAccountCreated = await sut.execute(fakeAccount)
    expect(wasAccountCreated).toBe(true)
  })
})

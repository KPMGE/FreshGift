namespace AddAccountUseCase {
  export type Props = {
    name: string,
    email: string,
    password: string
  }
}

interface AddAccountUseCase {
  execute(account: AddAccountUseCase.Props): Promise<void>
}

interface AddAccountRepository {
  add(account: AddAccountUseCase.Props): Promise<void>
}

interface Hasher {
  hash(plainText: string): Promise<void>
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

class AddAccountService implements AddAccountUseCase {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher
  ) { }
  async execute(account: AddAccountUseCase.Props): Promise<void> {
    await this.addAccountRepository.add(account)
    await this.hasher.hash(account.password)
  }
}

type SutTypes = {
  sut: AddAccountService,
  addAccountRepositoryMock: AddAccountRespositoryMock,
  hasherMock: HasherMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRespositoryMock()
  const hasherMock = new HasherMock()
  const sut = new AddAccountService(addAccountRepositoryMock, hasherMock)

  return {
    sut,
    hasherMock,
    addAccountRepositoryMock
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
})

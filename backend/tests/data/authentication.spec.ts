namespace AuthenticationUseCase {
  export type Props = {
    password: string
    email: string
  }
  export type Result = {
    accessToken: string
    name: string
  }
}

namespace LoadAccountByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}

interface AuthenticationUseCase {
  execute(input: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result>
}

interface LoadAccountByEmailRepository {
  load(email: string): Promise<LoadAccountByEmailRepository.Result>
}

interface HashComparer {
  compare(plainText: string, hashedInfo: string): Promise<boolean>
}

interface Encrypter {
  encrypt(plainText: string): Promise<string>
}

interface UpdateTokenRepository {
  update(id: string, token: string): Promise<void>
}

class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  input?: string
  output = {
    id: 'any_id',
    password: 'any_password',
    name: 'any_name'
  }
  async load(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.input = email
    return this.output
  }
}

class HashComparerSpy implements HashComparer {
  plainText?: string
  hashedInfo?: string
  output: boolean = true
  async compare(plainText: string, hashedInfo: string): Promise<boolean> {
    this.plainText = plainText
    this.hashedInfo = hashedInfo
    return this.output
  }
}

class EncrypterSpy implements Encrypter {
  plainText?: string
  output = 'some_token'
  async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText
    return this.output
  }
}

class UpdateTokenRepositoryMock implements UpdateTokenRepository {
  id?: string
  token?: string
  async update(id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

class AuthenticationService {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository
  ) { }
  async execute({ email, password }: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) return null
    const isPasswordCorrect = await this.hashComparer.compare(password, account.password)
    if (!isPasswordCorrect) return null
    const accessToken = await this.encrypter.encrypt(account.password)
    await this.updateTokenRepository.update(account.id, accessToken)
    return {
      accessToken,
      name: account.name
    }
  }
}

type SutTypes = {
  sut: AuthenticationService,
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateTokenRepositoryMock: UpdateTokenRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateTokenRepositoryMock = new UpdateTokenRepositoryMock()
  const sut = new AuthenticationService(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateTokenRepositoryMock)

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateTokenRepositoryMock
  }
}

describe('authentication', () => {
  const fakeInput = {
    email: 'any_email@gmail.com',
    password: 'any_password'
  }

  it('should call LoadAccountByEmailRepository with right data', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.execute(fakeInput)
    expect(loadAccountByEmailRepositorySpy.input).toBe(fakeInput.email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.load = () => { throw new Error() }
    const promise = sut.execute(fakeInput)
    expect(promise).rejects.toThrow()
  })

  it('should return null if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.output = null
    const result = await sut.execute(fakeInput)
    expect(result).toBeNull()
  })

  it('should call hashComparer with right data', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.execute(fakeInput)
    expect(hashComparerSpy.plainText).toBe(fakeInput.password)
    expect(hashComparerSpy.hashedInfo).toBe(loadAccountByEmailRepositorySpy.output.password)
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.compare = () => { throw new Error() }
    const promise = sut.execute(fakeInput)
    expect(promise).rejects.toThrow()
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.output = false
    const result = await sut.execute(fakeInput)
    expect(result).toBeNull()
  })

  it('should call encrypter with right data', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.execute(fakeInput)
    expect(encrypterSpy.plainText).toBe(loadAccountByEmailRepositorySpy.output.password)
  })

  it('should throw if encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    encrypterSpy.encrypt = () => { throw new Error() }
    const promise = sut.execute(fakeInput)
    await expect(promise).rejects.toThrow()
  })

  it('should call updateTokenRepository with right data', async () => {
    const { sut, loadAccountByEmailRepositorySpy, updateTokenRepositoryMock, encrypterSpy } = makeSut()
    await sut.execute(fakeInput)
    expect(updateTokenRepositoryMock.id).toBe(loadAccountByEmailRepositorySpy.output.id)
    expect(updateTokenRepositoryMock.token).toBe(encrypterSpy.output)
  })

  it('should return accessToken and name on success', async () => {
    const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    const result = await sut.execute(fakeInput)
    expect(result.name).toBe(loadAccountByEmailRepositorySpy.output.name)
    expect(result.accessToken).toBe(encrypterSpy.output)
  })
})

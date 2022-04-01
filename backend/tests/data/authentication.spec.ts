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

class AuthenticationService {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) { }
  async execute({ email, password }: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) return null
    const isPasswordCorrect = await this.hashComparer.compare(password, account.password)
    if (!isPasswordCorrect) return null
  }
}

type SutTypes = {
  sut: AuthenticationService,
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new AuthenticationService(loadAccountByEmailRepositorySpy, hashComparerSpy)

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
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
})

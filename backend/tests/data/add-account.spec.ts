import { AddAccountRepository, CheckAccountByEmailRepository } from "../../src/data/contracts"
import { AddAccountUseCase } from "../../src/domain/useCases"

interface Hasher {
  hash(plainText: string): Promise<string>
}

class AddAccountRepositorySpy implements AddAccountRepository {
  input?: AddAccountUseCase.Props
  output: boolean = true

  async add(account: AddAccountUseCase.Props): Promise<boolean> {
    this.input = account
    return this.output
  }
}

class HasherSpy implements Hasher {
  input?: string
  output: string = 'hashed_password'

  async hash(plainText: string): Promise<string> {
    this.input = plainText
    return this.output
  }
}

class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  input?: string
  output: boolean = false
  async check(email: string): Promise<boolean> {
    this.input = email
    return this.output
  }
}

class AddAccountService implements AddAccountUseCase {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }
  async execute(account: AddAccountUseCase.Props): Promise<boolean> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(account.email)
    if (accountAlreadyExists) return false
    const hashedPassword = await this.hasher.hash(account.password)
    const wasAccountAdded = await this.addAccountRepository.add({ ...account, password: hashedPassword })
    return wasAccountAdded
  }
}

type SutTypes = {
  sut: AddAccountService,
  addAccountRepositorySpy: AddAccountRepositorySpy,
  hasherSpy: HasherSpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const hasherSpy = new HasherSpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new AddAccountService(addAccountRepositorySpy, hasherSpy, checkAccountByEmailRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
  }
}

describe('add-account', () => {
  const fakeAccount = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }

  it('should call addAccountRepository with correct data', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    await sut.execute(fakeAccount)
    expect(addAccountRepositorySpy.input).toEqual({ ...fakeAccount, password: 'hashed_password' })
  })

  it('should call Hasher with correct data', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.execute(fakeAccount)
    expect(hasherSpy.input).toBe(fakeAccount.password)
  })

  it('should call CheckAccountByEmailRepository with correct data', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    await sut.execute(fakeAccount)
    expect(checkAccountByEmailRepositorySpy.input).toBe(fakeAccount.email)
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()
    const wasAccountCreated = await sut.execute(fakeAccount)
    expect(wasAccountCreated).toBe(true)
  })

  it('should return false if CheckAccountByEmailRepository retuns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.output = true
    const wasAccountCreated = await sut.execute(fakeAccount)
    expect(wasAccountCreated).toBe(false)
  })

  it('should return false if AddAccountRepository retuns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.output = false
    const wasAccountCreated = await sut.execute(fakeAccount)
    expect(wasAccountCreated).toBe(false)
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    hasherSpy.hash = () => { throw new Error() }
    const promise = sut.execute(fakeAccount)
    await expect(promise).rejects.toThrow()
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.add = () => { throw new Error() }
    const promise = sut.execute(fakeAccount)
    await expect(promise).rejects.toThrow()
  })
})

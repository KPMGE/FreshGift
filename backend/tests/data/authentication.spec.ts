import { AuthenticationService } from "../../src/data/services"
import { LoadAccountByEmailRepositorySpy, HashComparerSpy, EncrypterSpy, UpdateTokenRepositoryMock } from "./mocks"

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
    expect(encrypterSpy.plainText).toBe(loadAccountByEmailRepositorySpy.output.id)
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

  it('should throw if UpdateTokenRepository throws', async () => {
    const { sut, updateTokenRepositoryMock } = makeSut()
    updateTokenRepositoryMock.update = () => { throw new Error() }
    const promise = sut.execute(fakeInput)
    expect(promise).rejects.toThrow()
  })

  it('should return accessToken and name on success', async () => {
    const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    const result = await sut.execute(fakeInput)
    expect(result.name).toBe(loadAccountByEmailRepositorySpy.output.name)
    expect(result.accessToken).toBe(encrypterSpy.output)
  })
})

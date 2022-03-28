import { RandomIdGeneratorProvider, TokenGeneratorProvider } from "../../../../../src/data/providers"
import { RegisterUserService } from "../../../../../src/data/services/user/register-user"
import { MissingParameterError } from "../../../../../src/domain/errors"
import { RandomIdGeneratorProviderStub } from "../../providers"
import { RegisterUserRepositorySpy } from "../../repositories/user"

class TokenGeneratorProviderSpy implements TokenGeneratorProvider {
  input?: string

  generate(userId: string): string {
    this.input = userId
    return 'any_token'
  }
}

type SutTypes = {
  sut: RegisterUserService
  registerUserRepository: RegisterUserRepositorySpy
  genereateIdProvider: RandomIdGeneratorProvider
  tokenGeneratorProvider: TokenGeneratorProviderSpy
}

const makeSut = (): SutTypes => {
  const registerUserRepository = new RegisterUserRepositorySpy()
  const genereateIdProvider = new RandomIdGeneratorProviderStub()
  const tokenGeneratorProvider = new TokenGeneratorProviderSpy()
  const sut = new RegisterUserService(
    registerUserRepository,
    genereateIdProvider,
    tokenGeneratorProvider
  )

  return {
    sut,
    registerUserRepository,
    genereateIdProvider,
    tokenGeneratorProvider
  }
}

describe("register-user", () => {
  const fakeUser: RegisterUserService.Props = {
    name: "any_name",
    userName: "any_username",
    email: "validmail@gmail.com",
    password: "any_password",
    confirmPassword: "any_password",
  }

  describe("id generator provider", () => {
    it("should return a valid id", () => {
      const { genereateIdProvider } = makeSut()

      const id = genereateIdProvider.generate()

      expect(id).toBeTruthy()
    })
  })

  it("should call token generator with right userId", async () => {
    const { sut, tokenGeneratorProvider } = makeSut()

    await sut.execute(fakeUser)

    expect(tokenGeneratorProvider.input).toBe('any_valid_id')
  })

  it("should return a string token", async () => {
    const { sut } = makeSut()

    const token = await sut.execute(fakeUser)

    expect(token).toBe('any_token')
  })

  it("should generate an id to the user and pass it to the repository", async () => {
    const { sut, registerUserRepository } = makeSut()

    await sut.execute(fakeUser)

    expect(registerUserRepository.user).toEqual({
      ...fakeUser,
      id: "any_valid_id",
      savedGifts: []
    })
  })

  it("should throw and error no user is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute(undefined)

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("user")
    )
  })

  it("should throw and error if the name field is not filled in", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, name: "" })

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("name")
    )
  })

  it("should throw and error if the userName field is not filled in", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, userName: "" })

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("userName")
    )
  })

  it("should throw and error if the password field is not filled in", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, password: "" })

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("password")
    )
  })

  it("should throw and error if the confirmPassword field is not filled in", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, confirmPassword: "" })

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("confirmPassword")
    )
  })

  it("should throw and error if the email field is not filled in", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, email: "" })

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("email")
    )
  })

  it("should throw and error if the email field is invalid", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeUser, email: "invalid_email" })

    await expect(promise).rejects.toThrowError()
  })

  it("should throw and error password and confirmPassword don't match", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({
      ...fakeUser,
      password: "some_password",
      confirmPassword: "other_password",
    })

    await expect(promise).rejects.toThrowError()
  })
})

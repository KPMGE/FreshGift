import { UserDTO } from "../../../../../src/data/DTO";
import { RandomIdGeneratorProvider } from "../../../../../src/data/providers";
import { RegisterUserService } from "../../../../../src/data/services/user/register-user";
import { RandomIdGeneratorProviderStub } from "../../providers";
import { RegisterUserRepositorySpy } from "../../repositories/user";

type SutTypes = {
  sut: RegisterUserService;
  registerUserRepository: RegisterUserRepositorySpy;
  genereateIdProvider: RandomIdGeneratorProvider;
};

const makeSut = (): SutTypes => {
  const registerUserRepository = new RegisterUserRepositorySpy();
  const genereateIdProvider = new RandomIdGeneratorProviderStub();
  const sut = new RegisterUserService(
    registerUserRepository,
    genereateIdProvider
  );

  return {
    sut,
    registerUserRepository,
    genereateIdProvider,
  };
};

describe("register-user", () => {
  const fakeUser: UserDTO = {
    name: "any_name",
    userName: "any_username",
    email: "validmail@gmail.com",
    password: "any_password",
    confirmPassword: "any_password",
  };

  describe("id generator provider", () => {
    it("should return a valid id", () => {
      const { genereateIdProvider } = makeSut();

      const id = genereateIdProvider.generate();

      expect(id).toBeTruthy();
    });
  });

  it("should generate an id to the user and pass it to the repository", async () => {
    const { sut, registerUserRepository } = makeSut();

    await sut.execute(fakeUser);

    expect(registerUserRepository.user).toEqual({
      ...fakeUser,
      id: "any_valid_id",
    });
  });

  it("should throw and error if the name field is not filled in", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, name: "" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error if the userName field is not filled in", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, userName: "" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error if the password field is not filled in", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, password: "" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error if the confirmPassword field is not filled in", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, confirmPassword: "" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error if the email field is not filled in", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, confirmPassword: "" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error if the email field is invalid", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...fakeUser, email: "invalid_email" });

    await expect(promise).rejects.toThrowError();
  });

  it("should throw and error password and confirmPassword don't match", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      ...fakeUser,
      password: "some_password",
      confirmPassword: "other_password",
    });

    await expect(promise).rejects.toThrowError();
  });
});

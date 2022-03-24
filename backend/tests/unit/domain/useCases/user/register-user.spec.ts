import { Gift } from "../../../../../src/domain/entities";

type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  savedGifts: Gift[];
};

type UserDTO = {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterUser {
  execute(user: UserDTO): Promise<void>;
}

class RegisterUserRepository {
  user?: UserDTO;

  async register(user: UserDTO): Promise<void> {
    this.user = user;
  }
}

class RegisterUserService implements RegisterUser {
  constructor(
    private readonly registerUserRepository: RegisterUserRepository
  ) {}

  async execute(user: UserDTO): Promise<void> {
    if (!user.name) throw new Error();
    if (!user.userName) throw new Error();

    this.registerUserRepository.register(user);
  }
}

type SutTypes = {
  sut: RegisterUserService;
  registerUserRepository: RegisterUserRepository;
};

const makeSut = (): SutTypes => {
  const registerUserRepository = new RegisterUserRepository();
  const sut = new RegisterUserService(registerUserRepository);

  return {
    sut,
    registerUserRepository,
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

  it("should call repository with the right data", async () => {
    const { sut, registerUserRepository } = makeSut();

    await sut.execute(fakeUser);

    expect(registerUserRepository.user).toBe(fakeUser);
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
});

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
  execute(user: User): Promise<void>;
}

interface RegisterUserRepository {
  register(user: UserDTO): Promise<void>;
}

class RandomIdGeneratorProvider {
  generate(): string {
    return "any_valid_id";
  }
}

class RegisterUserRepositorySpy implements RegisterUserRepository {
  user?: User;

  async register(user: User): Promise<void> {
    this.user = user;
  }
}

class RegisterUserService implements RegisterUser {
  constructor(
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly genereateIdProvider: RandomIdGeneratorProvider
  ) {}

  async execute(user: UserDTO): Promise<void> {
    if (!user.name) throw new Error();
    if (!user.userName) throw new Error();
    if (!user.password) throw new Error();

    const id = this.genereateIdProvider.generate();
    const newUser = {
      ...user,
      id,
    };

    this.registerUserRepository.register(newUser);
  }
}

type SutTypes = {
  sut: RegisterUserService;
  registerUserRepository: RegisterUserRepositorySpy;
  genereateIdProvider: RandomIdGeneratorProvider;
};

const makeSut = (): SutTypes => {
  const registerUserRepository = new RegisterUserRepositorySpy();
  const genereateIdProvider = new RandomIdGeneratorProvider();
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
});

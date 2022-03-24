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

class RegisterUserRepository {
  user?: UserDTO;

  async register(user: UserDTO): Promise<void> {
    this.user = user;
  }
}

class RegisterUser {
  constructor(
    private readonly registerUserRepository: RegisterUserRepository
  ) {}
  async execute(user: UserDTO): Promise<void> {
    if (!user.name) throw new Error();

    this.registerUserRepository.register(user);
  }
}

describe("register-user", () => {
  const fakeUser: UserDTO = {
    name: "any_name",
    userName: "any_username",
    email: "validmail@gmail.com",
    password: "any_password",
    confirmPassword: "any_password",
  };

  it("should call repository with the right data", async () => {
    const registerUserRepository = new RegisterUserRepository();
    const sut = new RegisterUser(registerUserRepository);

    await sut.execute(fakeUser);

    expect(registerUserRepository.user).toBe(fakeUser);
  });

  it("should throw and error if the name field is not filled in", async () => {
    const registerUserRepository = new RegisterUserRepository();
    const sut = new RegisterUser(registerUserRepository);

    const promise = sut.execute({ ...fakeUser, name: "" });

    await expect(promise).rejects.toThrowError();
  });
});

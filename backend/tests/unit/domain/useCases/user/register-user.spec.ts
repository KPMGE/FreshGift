import { Gift } from "../../../../../src/domain/entities";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  savedGifts: Gift[];
};

type UserDTO = {
  name: string;
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
    this.registerUserRepository.register(user);
  }
}

describe("register-user", () => {
  const fakeUser: UserDTO = {
    name: "any_name",
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
});

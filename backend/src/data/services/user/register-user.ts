import { RegisterUser } from "../../../domain/useCases/user";
import { RegisterUserRepository } from "../../contracts/user";
import { RandomIdGeneratorProvider } from "../../providers";
import { UserDTO } from "../../DTO";
import { MissingParameterError } from "../../../domain/errors";

export class RegisterUserService implements RegisterUser {
  constructor(
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly genereateIdProvider: RandomIdGeneratorProvider
  ) {}

  async execute(user: UserDTO): Promise<void> {
    if (!user.name) throw new MissingParameterError("name");
    if (!user.userName) throw new Error();
    if (!user.password) throw new Error();
    if (!user.confirmPassword) throw new Error();
    if (!user.email) throw new Error();

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailRegex.test(user.email);
    if (!isValidEmail) throw new Error();

    if (user.password !== user.confirmPassword) throw new Error();

    const id = this.genereateIdProvider.generate();
    const newUser = {
      ...user,
      id,
    };

    this.registerUserRepository.register(newUser);
  }
}

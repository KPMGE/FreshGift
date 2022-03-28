import { RegisterUser } from "../../../domain/useCases/user";
import { RegisterUserRepository } from "../../contracts/user";
import { RandomIdGeneratorProvider, TokenGeneratorProvider } from "../../providers";
import { MissingParameterError, PasswordsDontMatchError } from "../../../domain/errors";
import { UserDTO } from "../../DTO";

export namespace RegisterUserService {
  export type Props = {
    name: string
    userName: string
    email: string
    password: string
    confirmPassword: string
  }
}

export class RegisterUserService implements RegisterUser {
  constructor(
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly genereateIdProvider: RandomIdGeneratorProvider,
    private readonly tokenGeneratorProvider: TokenGeneratorProvider
  ) { }

  async execute(user?: RegisterUserService.Props): Promise<string> {
    if (!user) throw new MissingParameterError("user");
    if (!user.name) throw new MissingParameterError("name");
    if (!user.userName) throw new MissingParameterError("userName");
    if (!user.password) throw new MissingParameterError("password");
    if (!user.confirmPassword)
      throw new MissingParameterError("confirmPassword");
    if (!user.email) throw new MissingParameterError("email");

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailRegex.test(user.email);
    if (!isValidEmail) throw new Error();

    if (user.password !== user.confirmPassword) throw new PasswordsDontMatchError();

    const id = this.genereateIdProvider.generate();
    const newUser: UserDTO = {
      ...user,
      id,
      savedGifts: []
    };

    this.registerUserRepository.register(newUser);

    const token = this.tokenGeneratorProvider.generate(id)
    return token
  }
}

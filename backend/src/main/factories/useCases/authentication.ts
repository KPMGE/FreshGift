import { AuthenticationService } from "../../../data/services";
import { AuthenticationUseCase } from "../../../domain/useCases";
import { BcryptAdapter } from "../../../infra/cryptography";
import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { FakeAccountRepository } from "../../../infra/repositories";
import { env } from "../../config/env";

export const makeAuthentication = (): AuthenticationUseCase => {
  const salt = 8
  const accountRepository = new FakeAccountRepository()
  const hasher = new BcryptAdapter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const auth = new AuthenticationService(accountRepository, hasher, encrypter, accountRepository)
  return auth
}

import { RandomIdGeneratorProviderStub } from "../../../../tests/unit/domain/providers"
import { TokenGeneratorProviderSpy } from "../../../../tests/unit/domain/providers/token-generator"
import { RegisterUserService } from "../../../data/services/user"
import { FakeRegisterUserRepository } from "../../../infra/repositories/fake/user-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { RegisterUserController } from "../../../presentation/controllers/user"

export const makeRegisterUserController = (): Controller => {
  const repo = new FakeRegisterUserRepository()
  const idGenerator = new RandomIdGeneratorProviderStub()
  const tokenGenerator = new TokenGeneratorProviderSpy()
  const server = new RegisterUserService(repo, idGenerator, tokenGenerator)
  const controller = new RegisterUserController(server)
  return controller
}

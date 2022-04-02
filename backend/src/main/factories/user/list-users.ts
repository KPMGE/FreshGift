import { ListUsersService } from "../../../data/services/user";
import { FakeListUsersRepository } from "../../../infra/repositories/fake/user-repository";
import { Controller } from "../../../presentation/contracts/controller";
import { ListUsersController } from "../../../presentation/controllers/user";

export const makeListUsersController = (): Controller => {
  const repo = new FakeListUsersRepository()
  const service = new ListUsersService(repo)
  const controller = new ListUsersController(service)
  return controller
}

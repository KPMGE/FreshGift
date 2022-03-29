import { GetUserService } from "../../../data/services/user/get-user";
import { FakeGetUserReposioty } from "../../../infra/repositories/fake/user-repository";
import { Controller } from "../../../presentation/contracts/controller";
import { GetUserController } from "../../../presentation/controllers/user";

export const makeGetUserController = (): Controller => {
  const repo = new FakeGetUserReposioty()
  const service = new GetUserService(repo)
  const controller = new GetUserController(service)
  return controller
}

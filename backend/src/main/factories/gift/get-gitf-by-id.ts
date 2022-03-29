import { GetGiftByIdService } from "../../../data/services/gift";
import { FakeGetGiftByIdRepository } from "../../../infra/repositories";
import { Controller } from "../../../presentation/contracts/controller";
import { GetGiftByIdController } from "../../../presentation/controllers/gift";

export const makeGetGiftByIdController = (): Controller => {
  const repo = new FakeGetGiftByIdRepository()
  const service = new GetGiftByIdService(repo)
  const controller = new GetGiftByIdController(service)
  return controller
}

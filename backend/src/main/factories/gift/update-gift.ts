import { UpdateGiftService } from "../../../data/services/gift";
import { FakeUpdateGiftRepository } from "../../../infra/repositories";
import { Controller } from "../../../presentation/contracts/controller";
import { UpdateGiftController } from "../../../presentation/controllers/gift";

export const makeUpdateGiftController = (): Controller => {
  const repo = new FakeUpdateGiftRepository()
  const service = new UpdateGiftService(repo)
  const controller = new UpdateGiftController(service)
  return controller
}

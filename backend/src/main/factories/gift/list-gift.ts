import { ListGiftService } from "../../../data/services/gift";
import { FakeListGiftRepository } from "../../../infra/repositories";
import { Controller } from "../../../presentation/contracts/controller";
import { ListGiftController } from "../../../presentation/controllers/gift";

export const makeListGiftController = (): Controller => {
  const repo = new FakeListGiftRepository()
  const service = new ListGiftService(repo)
  const controller = new ListGiftController(service)
  return controller
}

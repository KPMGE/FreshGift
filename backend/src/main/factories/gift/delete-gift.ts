import { DeleteGiftService } from "../../data/services/gift";
import { FakeDeleteGiftRepository } from "../../infra/repositories";
import { Controller } from "../../presentation/contracts/controller";
import { DeleteGiftController } from "../../presentation/controllers/gift";

export const makeDeleteGiftController = (): Controller => {
  const repo = new FakeDeleteGiftRepository()
  const service = new DeleteGiftService(repo)
  const controller = new DeleteGiftController(service)
  return controller
}


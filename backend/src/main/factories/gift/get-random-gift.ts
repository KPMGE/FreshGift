import { GetRandomGiftProviderSpy } from "../../../../tests/unit/domain/repositories/gift/get-random-gift";
import { GetRandomGiftService } from "../../../data/services/gift";
import { Controller } from "../../../presentation/contracts/controller";
import { GetRandomGiftController } from "../../../presentation/controllers/gift";

export const makeGetRandomGiftController = (): Controller => {
  const provider = new GetRandomGiftProviderSpy()
  const service = new GetRandomGiftService(provider)
  const controller = new GetRandomGiftController(service)
  return controller
}

import { CreateGiftController } from "../../../presentation/controllers/gift/create-gift";
import { makeCreateGift } from "../useCases/add-gift";
import { makeCreateGiftValidation } from "./create-gift-validation";

export const makeCreateGiftController = (): CreateGiftController => {
  const service = makeCreateGift()
  const validation = makeCreateGiftValidation()
  const controller = new CreateGiftController(service, validation)
  return controller
}

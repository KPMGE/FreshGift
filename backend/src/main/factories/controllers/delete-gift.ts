import { Controller } from "../../../presentation/contracts";
import { DeleteGiftController } from "../../../presentation/controllers/gift/delete-gift";
import { RequiredParameterValidation } from "../../../validation/validators";
import { makeDeleteGiftService } from "../useCases";

export const makeDeleteGiftController = (): Controller => {
  const service = makeDeleteGiftService()
  const validation = new RequiredParameterValidation('giftId')
  const controller = new DeleteGiftController(service, validation)
  return controller
}

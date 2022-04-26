import { ListGiftsController } from "../../../presentation/controllers";
import { makeListGiftsService } from "../useCases";

export const makeListGiftsController = (): ListGiftsController => {
  const controller = new ListGiftsController(makeListGiftsService())
  return controller
}

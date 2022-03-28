import { ListGift } from "../../../domain/useCases/gift"
import { HttpResponse, ok, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"
import { GiftViewModel } from "../../view-models"

export class ListGiftController implements Controller {
  constructor(private readonly listGiftService: ListGift) { }

  async handle(): Promise<HttpResponse<GiftViewModel[]>> {
    try {
      const gifts = await this.listGiftService.execute()
      return ok(gifts)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

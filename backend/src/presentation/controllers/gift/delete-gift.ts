import { DeleteGift } from "../../../domain/useCases/gift"
import { HttpRequest, HttpResponse, ok, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"
import { GiftViewModel } from "../../view-models"

export class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<GiftViewModel>> {
    try {
      const deletedGift = await this.deleteGiftService.execute(req?.body?.giftId)
      return ok(deletedGift)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

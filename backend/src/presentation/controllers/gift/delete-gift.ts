import { CannotDeleteGiftError, MissingParameterError } from "../../../domain/errors"
import { DeleteGift } from "../../../domain/useCases/gift"
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"
import { GiftViewModel } from "../../view-models"

export class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<GiftViewModel>> {
    try {
      const deletedGift = await this.deleteGiftService.execute(req?.params?.giftId)
      return ok(deletedGift)
    } catch (error) {
      if (error instanceof MissingParameterError) return badRequest(error.message)
      if (error instanceof CannotDeleteGiftError) return badRequest(error.message)
      return serverError(error as Error)
    }
  }
}

import { GiftNotFoundError } from "../../../data/errors"
import { DeleteGift } from "../../../domain/useCases"
import { Controller, HttpResponse, Validator } from "../../contracts"
import { badRequest, notFound, ok, serverError } from "../../helpers"

export class DeleteGiftController implements Controller {
  constructor(
    private readonly deleteGiftService: DeleteGift,
    private readonly validator: Validator
  ) { }

  async handle(request: any): Promise<HttpResponse> {
    const error = this.validator.validate(request)
    if (error) return badRequest(error)

    try {
      const deletedGift = await this.deleteGiftService.execute(request.giftId)
      return ok(deletedGift)
    } catch (error) {
      if (error instanceof GiftNotFoundError) return notFound(error)
      return serverError(error)
    }
  }
}


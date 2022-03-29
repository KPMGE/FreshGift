import { GetGiftById } from "../../../domain/useCases/gift"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"
import { GiftViewModel } from "../../view-models"

export class GetGiftByIdController implements Controller {
  constructor(private readonly getGiftByIdService: GetGiftById) { }

  async handle(req?: HttpRequest): Promise<HttpResponse<GiftViewModel>> {
    try {
      const foundGift = await this.getGiftByIdService.execute(req?.params?.giftId)
      if (!foundGift) return resourceNotFoundError('gift')
      return ok(foundGift)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

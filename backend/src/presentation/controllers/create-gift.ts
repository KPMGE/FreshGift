import { CreateGift } from "../../domain/useCases/gift"
import { HttpRequest, HttpResponse, ok, serverError } from "../contracts"
import { Controller } from "../contracts/controller"
import { GiftViewModel } from "../view-models"

export class CreateGiftController implements Controller {
  constructor(private readonly createGiftService: CreateGift) { }

  async handle(req?: HttpRequest<GiftViewModel>): Promise<HttpResponse<GiftViewModel>> {
    try {
      const createdGift = await this.createGiftService.execute(req?.body)
      return ok(createdGift)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

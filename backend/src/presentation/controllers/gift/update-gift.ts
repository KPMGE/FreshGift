import { GiftDTO } from "../../../data/DTO"
import { UpdateGift } from "../../../domain/useCases/gift"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class UpdateGiftController implements Controller {
  constructor(private readonly updateGiftService: UpdateGift) { }

  async handle(req?: HttpRequest<{ giftId: string, newGift: UpdateGift.Props }>): Promise<HttpResponse<GiftDTO | null>> {
    const foundGift = await this.updateGiftService.execute(req?.body?.giftId)
    if (!foundGift) return resourceNotFoundError('gift')
    return ok(foundGift)
  }
}

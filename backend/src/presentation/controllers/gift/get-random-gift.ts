import { GetRandomGiftService } from "../../../data/services/gift"
import { GetRandomGift } from "../../../domain/useCases/gift"
import { HttpResponse, ok } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class GetRandomGiftController implements Controller {
  constructor(private readonly getRandomGiftProvider: GetRandomGiftService) { }

  async handle(): Promise<HttpResponse<GetRandomGift.Props>> {
    const randomGift = await this.getRandomGiftProvider.execute({ min: 0, max: 100 })
    return ok(randomGift)
  }
}


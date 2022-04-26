import { ListGift } from "../../../domain/useCases"
import { Controller, HttpResponse } from "../../contracts"
import { ok, serverError } from "../../helpers"

export class ListGiftsController implements Controller {
  constructor(private readonly listGiftsService: ListGift) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const gifts = await this.listGiftsService.execute()
      return ok(gifts)
    } catch (error) {
      return serverError(error)
    }
  }
}

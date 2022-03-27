import { ListGiftService } from "../../../../src/data/services/gift"
import { ListGift } from "../../../../src/domain/useCases/gift"
import { FakeListGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, HttpResponse, ok, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GiftViewModel } from "../../../../src/presentation/view-models"

class ListGiftController implements Controller {
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

describe('list-gifts', () => {
  it('should return an empty array if no there is no saved gift', async () => {
    const listGiftRepository = new FakeListGiftRepository()
    const listGiftService = new ListGiftService(listGiftRepository)
    const sut = new ListGiftController(listGiftService)

    const response = await sut.handle()

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([])
  })
})

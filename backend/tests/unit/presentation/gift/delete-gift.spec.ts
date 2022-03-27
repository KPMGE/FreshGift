import { DeleteGiftService } from "../../../../src/data/services/gift"
import { DeleteGift } from "../../../../src/domain/useCases/gift"
import { HttpRequest, HttpResponse, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { DeleteGiftRepositorySpy } from "../../domain/repositories/gift"

class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<any>> {
    try {
      await this.deleteGiftService.execute(req?.body?.giftId)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

describe('delete-gift', () => {
  it('should return serverError if service throws', async () => {
    const deleteGiftRepository = new DeleteGiftRepositorySpy()
    const deleteGiftService = new DeleteGiftService(deleteGiftRepository)
    const sut = new DeleteGiftController(deleteGiftService)

    const resonse = await sut.handle({})

    expect(resonse).toEqual(serverError(new Error()))
  })
})

import { DeleteGiftService } from "../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../src/domain/errors"
import { DeleteGift } from "../../../../src/domain/useCases/gift"
import { HttpRequest, HttpResponse, ok, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GiftViewModel } from "../../../../src/presentation/view-models"
import { DeleteGiftRepositorySpy } from "../../domain/repositories/gift"

class DeleteGiftController implements Controller {
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

describe('delete-gift', () => {
  const fakeRequest: HttpRequest<{ giftId: string }> = {
    body: { giftId: 'any_gift_id' }
  }

  it('should return serverError if service throws', async () => {
    const deleteGiftRepository = new DeleteGiftRepositorySpy()
    const deleteGiftService = new DeleteGiftService(deleteGiftRepository)
    const sut = new DeleteGiftController(deleteGiftService)

    const response = await sut.handle({})

    expect(response).toEqual(serverError(new MissingParameterError('id')))
    expect(response.statusCode).toBe(500)
  })

  it('should return a valid HttpResponse with a valid deletedGift', async () => {
    const deleteGiftRepository = new DeleteGiftRepositorySpy()
    const deleteGiftService = new DeleteGiftService(deleteGiftRepository)
    const sut = new DeleteGiftController(deleteGiftService)

    const response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(200)
  })
})

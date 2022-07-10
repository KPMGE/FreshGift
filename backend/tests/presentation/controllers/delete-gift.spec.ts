import { Gift } from "../../../src/domain/entities"
import { DeleteGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"

class DeleteGiftServiceMock implements DeleteGift {
  giftId = ""
  execute(giftId: string): Promise<Gift> {
    this.giftId = giftId
    return null
  }
}

class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(request: any): Promise<HttpResponse> {
    const giftId = request.giftId
    this.deleteGiftService.execute(giftId)
    return null
  }
}

describe('delete-gift-controller', () => {
  it('should call service with right giftId', async () => {
    const service = new DeleteGiftServiceMock()
    const sut = new DeleteGiftController(service)

    await sut.handle({ giftId: 'any_gift_id' })

    expect(service.giftId).toEqual('any_gift_id')
  })
})

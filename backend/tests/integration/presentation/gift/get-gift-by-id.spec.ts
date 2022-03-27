import { GiftDTO } from "../../../../src/data/DTO"
import { GetGiftByIdService } from "../../../../src/data/services/gift"
import { GetGiftById } from "../../../../src/domain/useCases/gift"
import { FakeGetGiftByIdRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, HttpResponse, resourceNotFoundError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GiftViewModel } from "../../../../src/presentation/view-models"

class GetGiftByIdController implements Controller {
  constructor(private readonly getGiftByIdService: GetGiftById) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<GiftViewModel>> {
    const foundGift = await this.getGiftByIdService.execute(req?.body?.giftId)

    if (!foundGift) return resourceNotFoundError('gift')

    return foundGift
  }
}

describe('get-gift-by-id', () => {
  const fakeGift: GiftDTO = {
    id: 'any_gift_id',
    name: 'any_gift_id',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  beforeAll(async () => {
    // add a gift to the repository
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save(fakeGift)
  })

  it('should return resourceNotFoundError no gift is found', async () => {
    const repo = new FakeGetGiftByIdRepository()
    const service = new GetGiftByIdService(repo)
    const sut = new GetGiftByIdController(service)


    const gift = await sut.handle({ body: { giftId: 'invalid_gift_id' } })

    expect(gift.statusCode).toBe(404)
    expect(gift.data).toBe('gift')
  })
})

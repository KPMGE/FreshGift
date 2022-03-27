import { GiftDTO } from "../../../../src/data/DTO"
import { GetGiftByIdService } from "../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../src/domain/errors"
import { GetGiftById } from "../../../../src/domain/useCases/gift"
import { FakeGetGiftByIdRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GiftViewModel } from "../../../../src/presentation/view-models"

class GetGiftByIdController implements Controller {
  constructor(private readonly getGiftByIdService: GetGiftById) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<GiftViewModel>> {
    try {
      const foundGift = await this.getGiftByIdService.execute(req?.body?.giftId)
      if (!foundGift) return resourceNotFoundError('gift')
      return ok(foundGift)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

type SutTypes = {
  sut: GetGiftByIdController
}

const makeSut = (): SutTypes => {
  const repo = new FakeGetGiftByIdRepository()
  const service = new GetGiftByIdService(repo)
  const sut = new GetGiftByIdController(service)

  return {
    sut
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

  it('should return resourceNotFoundError no gift is found', async () => {
    const { sut } = makeSut()

    const gift = await sut.handle({ body: { giftId: 'invalid_gift_id' } })

    expect(gift.statusCode).toBe(404)
    expect(gift.data).toBe('gift')
  })

  it('should return serverError if service throws', async () => {
    const { sut } = makeSut()


    const response = await sut.handle()

    expect(response.statusCode).toBe(500)
    expect(response.data).toBe(new MissingParameterError('giftId').message)
  })

  it('should return the right gift', async () => {
    // save fakeGift in the fakeGiftRepository
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save(fakeGift)

    const { sut } = makeSut()

    const gift = await sut.handle({ body: { giftId: fakeGift.id } })

    expect(gift.statusCode).toBe(200)
    expect(gift.data).toEqual(fakeGift)
  })
})

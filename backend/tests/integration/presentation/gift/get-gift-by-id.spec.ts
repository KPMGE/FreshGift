import { GiftDTO } from "../../../../src/data/DTO"
import { GetGiftByIdService } from "../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../src/domain/errors"
import { FakeGetGiftByIdRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { GetGiftByIdController } from "../../../../src/presentation/controllers/gift"

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

    const gift = await sut.handle({ params: { giftId: 'invalid_gift_id' } })

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

    const gift = await sut.handle({ params: { giftId: fakeGift.id } })

    expect(gift.statusCode).toBe(200)
    expect(gift.data).toEqual(fakeGift)
  })
})

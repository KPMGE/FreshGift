import { UpdateGiftService } from "../../../../src/data/services/gift"
import { UpdateGift } from "../../../../src/domain/useCases/gift"
import { FakeGetGiftByIdRepository, FakeSaveGiftRepository, FakeUpdateGiftRepository } from "../../../../src/infra/repositories"
import { UpdateGiftController } from "../../../../src/presentation/controllers/gift"

type SutTypes = {
  sut: UpdateGiftController
}

const makeSut = (): SutTypes => {
  const repo = new FakeUpdateGiftRepository()
  const service = new UpdateGiftService(repo)
  const sut = new UpdateGiftController(service)

  return {
    sut
  }
}

describe('update-gift', () => {
  const fakeGiftId = 'any_gift_id'
  const fakeNewGift: UpdateGift.Props = {
    name: 'any_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  beforeAll(async () => {
    // save a fake gift in the respository
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save({ ...fakeNewGift, id: fakeGiftId })
  })

  it('should return resourceNotFoundError if gift is not found', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('gift')
  })

  it('should return updated gift', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({
      params: {
        giftId: fakeGiftId,
      },
      body: fakeNewGift
    })

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual({ ...fakeNewGift, id: fakeGiftId })

    const getGiftByIdRepository = new FakeGetGiftByIdRepository()
    const updatedGift = await getGiftByIdRepository.getGift(fakeGiftId)

    expect(updatedGift).toEqual({ ...fakeNewGift, id: fakeGiftId })
  })
})

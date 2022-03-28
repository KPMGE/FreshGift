import { GiftDTO } from "../../../../src/data/DTO"
import { UpdateGiftService } from "../../../../src/data/services/gift"
import { UpdateGift } from "../../../../src/domain/useCases/gift"
import { FakeGetGiftByIdRepository, FakeSaveGiftRepository, FakeUpdateGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class UpdateGiftController implements Controller {
  constructor(private readonly updateGiftService: UpdateGift) { }

  async handle(req?: HttpRequest<{ giftId: string }>): Promise<HttpResponse<GiftDTO | null>> {
    const foundGift = await this.updateGiftService.execute(req?.body?.giftId)
    if (!foundGift) return resourceNotFoundError('gift')
    return ok(foundGift)
  }
}

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
  const fakeGift: GiftDTO = {
    id: 'any_gift_id',
    name: 'any_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  beforeAll(async () => {
    // save a fake gift in the respository
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save(fakeGift)
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
      body: {

      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.data).toBe(fakeGift)

    const getGiftByIdRepository = new FakeGetGiftByIdRepository()
    const updatedGift = await getGiftByIdRepository.getGift(fakeGift.id)

    expect(updatedGift).toEqual(fakeGift)
  })
})

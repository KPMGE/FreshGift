import { DeleteGiftService } from "../../../../src/data/services/gift"
import { Gift } from "../../../../src/domain/entities"
import { FakeDeleteGiftRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest } from "../../../../src/presentation/contracts"
import { DeleteGiftController } from "../../../../src/presentation/controllers/gift/delete-gift"

type SutTypes = {
  sut: DeleteGiftController
}

const makeSut = (): SutTypes => {
  const deleteGiftRepository = new FakeDeleteGiftRepository()
  const deleteGiftService = new DeleteGiftService(deleteGiftRepository)
  const sut = new DeleteGiftController(deleteGiftService)

  return {
    sut
  }
}

describe('delete-gift', () => {
  const fakeGift: Gift = {
    id: 'any_gift_id',
    name: 'some_name',
    price: 100,
    imageUrl: 'some_image_url',
    description: 'some_description'
  }

  const fakeRequest: HttpRequest<{ giftId: string }> = {
    params: { giftId: 'any_gift_id' }
  }

  it('should return badRequest if wrong credentials are passed', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Missing parameter: id')
  })

  it('should return badRequest if wrong_gift_id is provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ params: { giftId: 'wrong_gift_id' } })

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('Cannot delete gift')
  })

  it('should return a valid HttpResponse with a valid deletedGift', async () => {
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save(fakeGift)

    const { sut } = makeSut()

    let response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(fakeGift)
  })
})

import { DeleteGiftService } from "../../../../src/data/services/gift"
import { Gift } from "../../../../src/domain/entities"
import { MissingParameterError } from "../../../../src/domain/errors"
import { DeleteGift } from "../../../../src/domain/useCases/gift"
import { FakeDeleteGiftRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, HttpResponse, ok, serverError } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GiftViewModel } from "../../../../src/presentation/view-models"

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
    body: { giftId: 'any_gift_id' }
  }

  it('should return serverError if service throws', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})

    expect(response).toEqual(serverError(new MissingParameterError('id')))
    expect(response.statusCode).toBe(500)
  })

  it('should return a valid HttpResponse with a valid deletedGift', async () => {
    const saveGiftRepository = new FakeSaveGiftRepository()
    await saveGiftRepository.save(fakeGift)

    const { sut } = makeSut()

    let response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual(fakeGift)

    response = await sut.handle(fakeRequest)

    expect(response.statusCode).toBe(500)
  })
})

import { SaveGiftRepository } from "../../../../src/data/contracts/gift"
import { CreateGiftService } from "../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../src/domain/errors"
import { FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, serverError } from "../../../../src/presentation/contracts"
import { CreateGiftController } from "../../../../src/presentation/controllers"
import { GiftViewModel } from "../../../../src/presentation/view-models"

type SutTypes = {
  sut: CreateGiftController,
  createGiftService: CreateGiftService
  saveGiftRepository: SaveGiftRepository
}

const makeSut = (): SutTypes => {
  const saveGiftRepository = new FakeSaveGiftRepository()
  const createGiftService = new CreateGiftService(saveGiftRepository)
  const sut = new CreateGiftController(createGiftService)

  return {
    sut,
    saveGiftRepository,
    createGiftService,
  }
}

describe('create-gift-controller', () => {
  const fakeGift: GiftViewModel = {
    id: 'some_gift_id',
    name: 'some_gift_name',
    price: 100,
    imageUrl: 'some_image_url',
    description: 'some_description'
  }

  const fakeRequest: HttpRequest<GiftViewModel> = {
    body: fakeGift
  }

  it('should return serverError if createGiftService throws', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({})

    expect(response).toEqual(serverError(new MissingParameterError('gift')))
    expect(response.statusCode).toBe(500)
  })

  it('should return ok with the saved gift', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(fakeRequest)

    expect(response).toBeTruthy()
    expect(response.data).toEqual(fakeGift)
    expect(response.statusCode).toBe(200)
  })
})

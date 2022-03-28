import { SaveGiftRepository } from "../../../../src/data/contracts/gift"
import { CreateGiftService } from "../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../src/domain/errors"
import { CreateGift } from "../../../../src/domain/useCases/gift"
import { FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { HttpRequest, serverError } from "../../../../src/presentation/contracts"
import { CreateGiftController } from "../../../../src/presentation/controllers/gift"
import { RandomIdGeneratorProviderStub } from "../../../unit/domain/providers"

type SutTypes = {
  sut: CreateGiftController,
  createGiftService: CreateGiftService
  saveGiftRepository: SaveGiftRepository
}

const makeSut = (): SutTypes => {
  const saveGiftRepository = new FakeSaveGiftRepository()
  const randomIdGenerator = new RandomIdGeneratorProviderStub()
  const createGiftService = new CreateGiftService(saveGiftRepository, randomIdGenerator)
  const sut = new CreateGiftController(createGiftService)

  return {
    sut,
    saveGiftRepository,
    createGiftService,
  }
}

describe('create-gift-controller', () => {
  const fakeGift: CreateGift.Props = {
    name: 'some_gift_name',
    price: 100,
    imageUrl: 'some_image_url',
    description: 'some_description'
  }

  const fakeRequest: HttpRequest<CreateGift.Props> = {
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
    expect(response.data).toEqual({ ...fakeGift, id: 'any_valid_id' })
    expect(response.statusCode).toBe(200)
  })
})

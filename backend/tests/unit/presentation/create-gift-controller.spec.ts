import { CreateGiftService } from "../../../src/data/services/gift"
import { Gift } from "../../../src/domain/entities"
import { MissingParameterError } from "../../../src/domain/errors"
import { CreateGift } from "../../../src/domain/useCases/gift"
import { SaveGiftRepositoryMock } from "../domain/repositories/gift"

interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

interface HttpRequest<T = any> {
  body?: T
}

interface Controller {
  handle(req?: HttpRequest): Promise<HttpResponse>
}

class CreateGiftController implements Controller {
  constructor(private readonly createGiftService: CreateGift) { }

  async handle(req?: HttpRequest<any>): Promise<HttpResponse<Gift>> {
    if (!req) throw new MissingParameterError('request')
    if (!req.body) throw new MissingParameterError('request.body')

    return this.createGiftService.execute(req?.body)
  }
}

type SutTypes = {
  sut: CreateGiftController,
  createGiftService: CreateGiftService
  saveGiftRepository: SaveGiftRepositoryMock
}

const makeSut = (): SutTypes => {
  const saveGiftRepository = new SaveGiftRepositoryMock()
  const createGiftService = new CreateGiftService(saveGiftRepository)
  const sut = new CreateGiftController(createGiftService)

  return {
    sut,
    saveGiftRepository,
    createGiftService,
  }
}

describe('create-gift-controller', () => {
  const fakeGift: Gift = {
    id: 'some_gift_id',
    name: 'some_gift_name',
    price: 100,
    imageUrl: 'some_image_url',
    description: 'some_description'
  }

  const fakeRequest: HttpRequest<Gift> = {
    body: fakeGift
  }

  it('should throw an error if no request is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.handle()

    await expect(promise).rejects.toThrowError(new MissingParameterError('request'))
  })

  it('should throw an error if no request body is provided', async () => {
    const { sut } = makeSut()

    fakeRequest.body = undefined
    const promise = sut.handle(fakeRequest)

    await expect(promise).rejects.toThrowError(new MissingParameterError('request.body'))
  })
})

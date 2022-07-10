import { GiftNotFoundError } from "../../../src/data/errors"
import { Gift } from "../../../src/domain/entities"
import { DeleteGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { ServerError } from "../../../src/presentation/errors"
import { badRequest, ok, serverError } from "../../../src/presentation/helpers"
import { makeFakeGift } from "../../domain/mocks/gift"

class DeleteGiftServiceSpy implements DeleteGift {
  giftId = ""
  deletedGift = makeFakeGift()
  async execute(giftId: string): Promise<Gift> {
    this.giftId = giftId
    return this.deletedGift
  }
}

class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(request: any): Promise<HttpResponse> {
    const giftId = request.giftId

    try {
      const deletedGift = await this.deleteGiftService.execute(giftId)
      return ok(deletedGift)
    } catch (error) {
      if (error instanceof GiftNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: DeleteGiftController,
  service: DeleteGiftServiceSpy
}

const makeSut = (): SutTypes => {
  const service = new DeleteGiftServiceSpy()
  const sut = new DeleteGiftController(service)
  return {
    sut,
    service
  }
}

describe('delete-gift-controller', () => {
  it('should call service with right giftId', async () => {
    const { service, sut } = makeSut()
    await sut.handle({ giftId: 'any_gift_id' })

    expect(service.giftId).toEqual('any_gift_id')
  })

  it('should return badRequest if service returns GiftNotFoundError', async () => {
    const { service, sut } = makeSut()
    service.execute = () => { throw new GiftNotFoundError() }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new GiftNotFoundError())
  })

  it('should return serverError if service returns error', async () => {
    const { service, sut } = makeSut()
    service.execute = () => { throw new Error('some strange error') }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('some strange error'))
  })

  it('should return deleted gift on success', async () => {
    const { service, sut } = makeSut()

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(makeFakeGift())
  })
})

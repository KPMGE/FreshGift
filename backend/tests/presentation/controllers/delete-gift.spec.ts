import { GiftNotFoundError } from "../../../src/data/errors"
import { Gift } from "../../../src/domain/entities"
import { DeleteGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { badRequest } from "../../../src/presentation/helpers"

class DeleteGiftServiceMock implements DeleteGift {
  giftId = ""
  execute(giftId: string): Promise<Gift> {
    this.giftId = giftId
    return null
  }
}

class DeleteGiftController implements Controller {
  constructor(private readonly deleteGiftService: DeleteGift) { }

  async handle(request: any): Promise<HttpResponse> {
    const giftId = request.giftId

    try {
      this.deleteGiftService.execute(giftId)
    } catch (error) {
      if (error instanceof GiftNotFoundError) return badRequest(error)
      return null
    }
  }
}

type SutTypes = {
  sut: DeleteGiftController,
  service: DeleteGiftServiceMock
}

const makeSut = (): SutTypes => {
  const service = new DeleteGiftServiceMock()
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
})

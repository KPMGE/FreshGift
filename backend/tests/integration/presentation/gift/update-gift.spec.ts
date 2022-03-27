import { GiftDTO } from "../../../../src/data/DTO"
import { UpdateGiftService } from "../../../../src/data/services/gift"
import { UpdateGift } from "../../../../src/domain/useCases/gift"
import { FakeUpdateGiftRepository } from "../../../../src/infra/repositories"
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
  it('should return resourceNotFoundError if gift is not found', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response.statusCode).toBe(404)
    expect(response.data).toBe('gift')
  })
})

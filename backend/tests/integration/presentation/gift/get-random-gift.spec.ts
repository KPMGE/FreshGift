import { GetRandomGiftService } from "../../../../src/data/services/gift"
import { GetRandomGift } from "../../../../src/domain/useCases/gift"
import { HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GetRandomGiftProviderSpy } from "../../../unit/domain/repositories/gift/get-random-gift"

class GetRandomGiftController implements Controller {
  constructor(private readonly getRandomGiftProvider: GetRandomGiftService) { }

  async handle(): Promise<HttpResponse<GetRandomGift.Props>> {
    const randomGift = await this.getRandomGiftProvider.execute({ min: 0, max: 100 })
    return ok(randomGift)
  }
}

type SutTypes = {
  sut: GetRandomGiftController
}

const makeSut = (): SutTypes => {
  const provider = new GetRandomGiftProviderSpy()
  const service = new GetRandomGiftService(provider)
  const sut = new GetRandomGiftController(service)

  return {
    sut
  }
}

describe('get-random-gift', () => {
  it('should return a random gift', async () => {
    const { sut } = makeSut()
    const randomGift = await sut.handle()

    expect(randomGift).toBeTruthy()
  })
})

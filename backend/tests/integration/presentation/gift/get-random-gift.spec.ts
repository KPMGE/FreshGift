import { GetRandomGiftService } from "../../../../src/data/services/gift"
import { GetRandomGiftController } from "../../../../src/presentation/controllers/gift/get-random-gift"
import { GetRandomGiftProviderSpy } from "../../../unit/domain/repositories/gift/get-random-gift"

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

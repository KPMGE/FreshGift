import { GetRandomGiftService } from "../../../../../src/data/services/gift"
import { GetRandomGiftProviderSpy } from "../../repositories/gift/get-random-gift"

type SutTypes = {
  sut: GetRandomGiftService,
  getRandomGiftProvider: GetRandomGiftProviderSpy
}

const makeSut = (): SutTypes => {
  const getRandomGiftProvider = new GetRandomGiftProviderSpy()
  const sut = new GetRandomGiftService(getRandomGiftProvider)

  return {
    sut,
    getRandomGiftProvider
  }
}

describe("get-random-gift", () => {
  it('should call getRandomGiftprovider with right data', async () => {
    const { sut, getRandomGiftProvider } = makeSut()

    await sut.execute({ min: 0, max: 100 })

    expect(getRandomGiftProvider.input).toEqual({ min: 0, max: 100 })
  })

  it("should return a random gift inside the given range", async () => {
    const { sut } = makeSut()

    const gift = await sut.execute({ min: 0, max: 200 })

    expect(gift?.price).toBeGreaterThanOrEqual(0)
    expect(gift?.price).toBeLessThanOrEqual(200)
    expect(gift).toBeTruthy()
    expect(gift).toHaveProperty("description")
    expect(gift).toHaveProperty("name")
    expect(gift).toHaveProperty("price")
    expect(gift).toHaveProperty("imageUrl")
  })
})

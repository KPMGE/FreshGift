import { UpdateGiftService } from "../../../../../src/data/services/gift"
import { UpdateGift } from "../../../../../src/domain/useCases/gift"
import { UpdateGiftRepositorySpy } from "../../repositories/gift/"

type SutTypes = {
  sut: UpdateGiftService
  updateGiftRepository: UpdateGiftRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateGiftRepository = new UpdateGiftRepositorySpy()
  const sut = new UpdateGiftService(updateGiftRepository)

  return {
    sut,
    updateGiftRepository,
  }
}

describe("update-gift", () => {
  const fakeGiftId = 'any_gift_id'
  const fakeNewGift: UpdateGift.Props = {
    name: "any_name",
    description: "any_description",
    price: 1,
    imageUrl: "any_image",
  }

  it("should call update repository with the right data", async () => {
    const { sut, updateGiftRepository } = makeSut()
    await sut.execute(fakeGiftId, fakeNewGift)

    expect(updateGiftRepository.giftId).toBe(fakeGiftId)
    expect(updateGiftRepository.newGift).toEqual(fakeNewGift)
  })

  it("should return the updated gift", async () => {
    const { sut } = makeSut()

    const updatedGift = await sut.execute(fakeGiftId)

    expect(updatedGift).toEqual({ ...fakeNewGift, id: fakeGiftId })
  })

  it("should call repository only once", async () => {
    const { sut, updateGiftRepository } = makeSut()
    await sut.execute(fakeGiftId)

    expect(updateGiftRepository.callsCount).toBe(1)
  })

  it("should return null if no gift is found", async () => {
    const { sut, updateGiftRepository } = makeSut()
    updateGiftRepository.output = undefined

    const foundGift = await sut.execute(fakeGiftId)

    expect(foundGift).toBeNull()
  })
})

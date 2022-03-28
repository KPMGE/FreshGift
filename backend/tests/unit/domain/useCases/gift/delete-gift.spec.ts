import { DeleteGift } from "../../../../../src/domain/useCases/gift"
import { DeleteGiftService } from "../../../../../src/data/services/gift"
import { DeleteGiftRepositorySpy } from "../../repositories/gift"
import { MissingParameterError } from "../../../../../src/domain/errors"

type SutTypes = {
  sut: DeleteGift
  deleteRepository: DeleteGiftRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteRepository = new DeleteGiftRepositorySpy()
  const sut = new DeleteGiftService(deleteRepository)

  return {
    sut,
    deleteRepository,
  }
}

describe("delete-gift", () => {
  const fakeGift = {
    id: "any_gift_id",
    name: "any_gift_name",
    description: "any_gift_description",
    price: 0,
    imageUrl: "any_gift_image",
  }

  it("should throw an error if no id is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute(undefined)

    await expect(promise).rejects.toThrowError(new MissingParameterError('id'))
  })


  it("should call delete repository with correct data.", async () => {
    const { sut, deleteRepository } = makeSut()

    await sut.execute(fakeGift.id)

    expect(deleteRepository.giftId).toBe(fakeGift.id)
  })

  it("should call repository only once", async () => {
    const { sut, deleteRepository } = makeSut()

    await sut.execute(fakeGift.id)

    expect(deleteRepository.callsCount).toBe(1)
  })

  it("should return deleted gift", async () => {
    const { sut } = makeSut()

    const deletedGift = await sut.execute(fakeGift.id)

    expect(deletedGift).toEqual(fakeGift)
  })
})

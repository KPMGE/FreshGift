import { SaveGiftRepositoryMock } from "../../repositories/gift"
import { CreateGift } from "../../../../../src/domain/useCases/gift"
import { CreateGiftService } from "../../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../../src/domain/errors"
import { RandomIdGeneratorProviderStub } from "../../providers"

type SutTypes = {
  sut: CreateGift
  saveGiftRepository: SaveGiftRepositoryMock
}

const makeSut = (): SutTypes => {
  const saveGiftRepository = new SaveGiftRepositoryMock()
  const randomIdGenerator = new RandomIdGeneratorProviderStub()
  const sut = new CreateGiftService(saveGiftRepository, randomIdGenerator)

  return {
    sut,
    saveGiftRepository,
  }
}

describe("create-gift", () => {
  const fakeGift: CreateGift.Props = {
    name: "gift",
    price: 10,
    description: "description",
    imageUrl: "image_url",
  }

  it("should throw error if no gift is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute(undefined)

    expect(promise).rejects.toThrowError(new MissingParameterError('gift'))
  })

  it("should throw error if no gift name is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeGift, name: '' })

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.name'))
  })

  it("should throw error if no gift description is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeGift, description: '' })

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.description'))
  })

  it("should throw error if no gift imageUrl is provided", async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ ...fakeGift, imageUrl: '' })

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.imageUrl'))
  })

  it("should call repository with correct data.", () => {
    const { sut, saveGiftRepository } = makeSut()

    sut.execute(fakeGift)

    expect(saveGiftRepository.input).toEqual({ ...fakeGift, id: 'any_valid_id' })
  })

  it("should generate an id for the gift", () => {
    const { sut, saveGiftRepository } = makeSut()

    sut.execute(fakeGift)

    expect(saveGiftRepository.input).toHaveProperty('id')
    expect(saveGiftRepository.input?.id).toBe('any_valid_id')
  })

  it("should call repository only once", () => {
    const { sut, saveGiftRepository } = makeSut()

    sut.execute(fakeGift)

    expect(saveGiftRepository.callsCount).toBe(1)
  })

  it("return created gift", async () => {
    const { sut } = makeSut()

    const createdGift = await sut.execute(fakeGift)

    expect(createdGift).toEqual({ ...fakeGift, id: 'any_valid_id' })
  })
})

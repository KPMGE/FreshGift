import { CreateGift } from "../../src/domain/useCases"
import { SaveGiftRepositorySpy } from "./mocks/save-gift-repository"
import { IdGeneratorStub } from "./mocks/id-generator"
import { CreateGiftService } from "../../src/data/services"

type SutTypes = {
  saveGiftRepo: SaveGiftRepositorySpy
  idGenerator: IdGeneratorStub,
  sut: CreateGiftService
}

const makeSut = (): SutTypes => {
  const saveGiftRepo = new SaveGiftRepositorySpy()
  const idGenerator = new IdGeneratorStub()
  const sut = new CreateGiftService(saveGiftRepo, idGenerator)
  return {
    saveGiftRepo,
    idGenerator,
    sut
  }
}

const fakeInput: CreateGift.Props = {
  name: 'any_name',
  description: 'any_description',
  imageUrl: 'any_image_url',
  price: 100.1
}

describe("create-gift", () => {
  it("should call repository with right data", async () => {
    const { saveGiftRepo, idGenerator, sut } = makeSut()

    await sut.execute(fakeInput)

    expect(saveGiftRepo.input).toEqual({ ...fakeInput, id: idGenerator.output })
  })

  it("should throw if repository throws", async () => {
    const { saveGiftRepo, sut } = makeSut()
    saveGiftRepo.save = () => { throw new Error("repo error") }

    const promise = sut.execute(fakeInput)

    await expect(promise).rejects.toThrowError(new Error("repo error"))
  })

  it("should return right data on success", async () => {
    const { sut, idGenerator } = makeSut()

    const savedGift = await sut.execute(fakeInput)

    expect(savedGift).toEqual({ ...fakeInput, id: idGenerator.output })
  })
})

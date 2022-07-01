import { CreateGift } from "../../src/domain/useCases"
import { SaveGiftRepositorySpy } from "./mocks/save-gift-repository"
import { IdGeneratorStub } from "./mocks/id-generator"
import { CreateGiftService } from "../../src/data/services"
import { Gift } from "../../src/domain/entities"
import { makeFakeGift } from "../domain/mocks/gift"
import { FindGiftByNameRepository } from "../../src/data/contracts/gift/find-gift-by-name"

class FindGiftByNameRepositoryMock implements FindGiftByNameRepository {
  name = ""
  async find(name: string): Promise<Gift> {
    this.name = name
    return null
  }
}

type SutTypes = {
  saveGiftRepo: SaveGiftRepositorySpy
  idGenerator: IdGeneratorStub,
  findGiftRepo: FindGiftByNameRepositoryMock,
  sut: CreateGiftService
}

const makeSut = (): SutTypes => {
  const saveGiftRepo = new SaveGiftRepositorySpy()
  const idGenerator = new IdGeneratorStub()
  const findGiftRepo = new FindGiftByNameRepositoryMock()
  const sut = new CreateGiftService(saveGiftRepo, idGenerator, findGiftRepo)
  return {
    saveGiftRepo,
    idGenerator,
    sut,
    findGiftRepo
  }
}

const fakeInput: CreateGift.Props = {
  name: 'any_name',
  description: 'any_description',
  imageUrl: 'any_image_url',
  price: 100.1
}

describe("create-gift", () => {
  it("should return error if gift name is already taken", async () => {
    const { sut, findGiftRepo } = makeSut()
    findGiftRepo.find = () => Promise.resolve(makeFakeGift())

    const promise = sut.execute(fakeInput)

    expect(promise).rejects.toThrowError(new Error('gift name already taken!'))
  })


  it("should call repository with right gift name", async () => {
    const { sut, findGiftRepo } = makeSut()
    await sut.execute(fakeInput)

    expect(findGiftRepo.name).toEqual(fakeInput.name)
  })

  it("it should return error if gift name is already taken", async () => {
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

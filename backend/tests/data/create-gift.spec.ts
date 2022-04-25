import { Gift } from "../../src/domain/entities"
import { CreateGift } from "../../src/domain/useCases"
import { SaveGiftRepository } from "../../src/data/contracts"

interface IdGenerator {
  generate(): string
}

class SaveGiftRepositorySpy implements SaveGiftRepository {
  input
  async save(gift: Gift): Promise<Gift> {
    this.input = gift
    return null
  }
}

class IdGeneratorStub implements IdGenerator {
  output = "any_id"
  generate(): string {
    return this.output
  }
}

class CreateGiftService implements CreateGift {
  constructor(
    private readonly giftRepo: SaveGiftRepository,
    private readonly idGenerator: IdGenerator
  ) { }

  async execute(gift: CreateGift.Props): Promise<Gift> {
    const newGift = { ...gift, id: this.idGenerator.generate() }
    const savedGift = await this.giftRepo.save(newGift)
    return savedGift
  }
}


describe("create-gift", () => {
  it("should call repository with right data", async () => {
    const saveGiftRepo = new SaveGiftRepositorySpy()
    const idGenerator = new IdGeneratorStub()
    const sut = new CreateGiftService(saveGiftRepo, idGenerator)

    const fakeInput: CreateGift.Props = {
      name: 'any_name',
      description: 'any_description',
      imageUrl: 'any_image_url',
      price: 100.1
    }

    await sut.execute(fakeInput)

    expect(saveGiftRepo.input).toEqual({ ...fakeInput, id: idGenerator.output })
  })
})

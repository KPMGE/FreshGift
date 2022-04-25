import { ListGiftRepository } from "../../src/data/contracts"
import { Gift } from "../../src/domain/entities"
import { ListGift } from "../../src/domain/useCases"

const fakeGift: Gift = {
  id: 'any_id',
  name: 'any_name',
  price: 100.2,
  imageUrl: 'any_image_url',
  description: 'any_description'
}

class ListGiftsRepositoryStub implements ListGiftRepository {
  output = [fakeGift, fakeGift]
  async list(): Promise<Gift[]> {
    return this.output
  }
}

class ListGiftsService implements ListGift {
  constructor(private readonly listGiftRepo: ListGiftRepository) { }
  async execute(): Promise<Gift[]> {
    return await this.listGiftRepo.list()
  }
}

type SutTypes = {
  listGiftRepo: ListGiftsRepositoryStub,
  sut: ListGiftsService
}

const makeSut = (): SutTypes => {
  const listGiftRepo = new ListGiftsRepositoryStub()
  const sut = new ListGiftsService(listGiftRepo)
  return {
    listGiftRepo,
    sut
  }
}

describe('list-gifts-service', () => {
  const { sut } = makeSut()
  it('should return right data', async () => {
    const gifts = await sut.execute()
    expect(gifts).toEqual([fakeGift, fakeGift])
  })

  it('should throw if repository throws', async () => {
    const { sut, listGiftRepo } = makeSut()
    listGiftRepo.list = () => { throw new Error('repo error') }
    const promise = sut.execute()
    expect(promise).rejects.toThrow()
  })
}) 

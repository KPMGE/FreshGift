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

describe('list-gifts-service', () => {
  it('should return right data', async () => {
    const listGiftRepo = new ListGiftsRepositoryStub()
    const sut = new ListGiftsService(listGiftRepo)
    const gifts = await sut.execute()
    expect(gifts).toEqual([fakeGift, fakeGift])
  })

  it('should throw if repository throws', async () => {
    const listGiftRepo = new ListGiftsRepositoryStub()
    const sut = new ListGiftsService(listGiftRepo)
    listGiftRepo.list = () => { throw new Error('repo error') }
    const promise = sut.execute()
    expect(promise).rejects.toThrow()
  })
}) 

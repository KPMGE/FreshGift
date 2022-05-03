import { DeleteGiftRepository } from "../../src/data/contracts"
import { Gift } from "../../src/domain/entities"
import { DeleteGift } from "../../src/domain/useCases"

class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteGiftRepo: DeleteGiftRepository) { }
  async execute(giftId: string): Promise<Gift> {
    const deletedGift = await this.deleteGiftRepo.delete(giftId)
    return deletedGift
  }
}

const fakeGift: Gift = {
  id: 'any_gift_id',
  name: 'any_gift_name',
  price: 200.5,
  imageUrl: 'any_image_url',
  description: 'any_description'
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  input: any
  output = fakeGift
  async delete(giftId: string): Promise<Gift> {
    this.input = giftId
    return this.output
  }
}

type SutTypes = {
  sut: DeleteGiftService,
  deleteGiftRepo: DeleteGiftRepositoryMock
}

const makeSut = (): SutTypes => {
  const deleteGiftRepo = new DeleteGiftRepositoryMock()
  const sut = new DeleteGiftService(deleteGiftRepo)
  return {
    sut,
    deleteGiftRepo
  }
}

describe('delete-gift', () => {
  it('should call repository with right gift id', () => {
    const { deleteGiftRepo, sut } = makeSut()
    sut.execute('any_gift_id')
    expect(deleteGiftRepo.input).toBe('any_gift_id')
  })

  it('should throw if repository throws', async () => {
    const { deleteGiftRepo, sut } = makeSut()
    deleteGiftRepo.delete = () => { throw new Error('repo error') }
    const promise = sut.execute('any_gift_id')
    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should return the deleted gift from repository', async () => {
    const { deleteGiftRepo, sut } = makeSut()
    deleteGiftRepo.output = fakeGift
    const deletedGift = await sut.execute('any_gift_id')
    expect(deletedGift).toEqual(fakeGift)
  })
})

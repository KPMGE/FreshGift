import { DeleteGiftRepository, FindGiftRepository } from "../../src/data/contracts"
import { Gift } from "../../src/domain/entities"
import { DeleteGift, FindGift } from "../../src/domain/useCases"


const fakeGift: Gift = {
  id: 'any_gift_id',
  name: 'any_gift_name',
  price: 200.5,
  imageUrl: 'any_image_url',
  description: 'any_description'
}

class FindGiftRepositoryMock implements FindGiftRepository {
  input: any
  output = fakeGift
  async find(giftId: string): Promise<Gift> {
    this.input = giftId
    return this.output
  }
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  input: any
  output = fakeGift
  async delete(giftId: string): Promise<Gift> {
    this.input = giftId
    return this.output
  }
}
class DeleteGiftService implements DeleteGift {
  constructor(
    private readonly deleteGiftRepo: DeleteGiftRepository,
    private readonly findGiftRepo: FindGiftRepository
  ) { }
  async execute(giftId: string): Promise<Gift> {
    const foundGift = await this.findGiftRepo.find(giftId)
    if (!foundGift) throw new Error('gift not found')
    const deletedGift = await this.deleteGiftRepo.delete(giftId)
    return deletedGift
  }
}

type SutTypes = {
  sut: DeleteGiftService,
  deleteGiftRepo: DeleteGiftRepositoryMock
  findGiftRepo: FindGiftRepositoryMock
}

const makeSut = (): SutTypes => {
  const deleteGiftRepo = new DeleteGiftRepositoryMock()
  const findGiftRepo = new FindGiftRepositoryMock()
  const sut = new DeleteGiftService(deleteGiftRepo, findGiftRepo)
  return {
    sut,
    deleteGiftRepo,
    findGiftRepo
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

  it('should call find repository with correct gift id', () => {
    const { findGiftRepo, sut } = makeSut()
    sut.execute('any_gift_id')
    expect(findGiftRepo.input).toBe('any_gift_id')
  })

  it('should throw if findGiftRepository throws', () => {
    const { findGiftRepo, sut } = makeSut()
    findGiftRepo.find = () => { throw new Error('repo error') }
    const promise = sut.execute('any_gift_id')
    expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should throw error if no gift was found', () => {
    const { findGiftRepo, sut } = makeSut()
    findGiftRepo.output = null
    const promise = sut.execute('any_gift_id')
    expect(promise).rejects.toThrowError(new Error('gift not found'))
  })
})

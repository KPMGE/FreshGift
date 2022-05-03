import { DeleteGiftRepository } from "../../src/data/contracts"
import { Gift } from "../../src/domain/entities"
import { DeleteGift } from "../../src/domain/useCases"

class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteGiftRepo: DeleteGiftRepository) { }
  async execute(giftId: string): Promise<Gift> {
    this.deleteGiftRepo.delete(giftId)
    return null
  }
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  input: any
  async delete(giftId: string): Promise<Gift> {
    this.input = giftId
    return null
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

  it('should throw if repository throws', () => {
    const { deleteGiftRepo, sut } = makeSut()
    deleteGiftRepo.delete = () => { throw new Error('repo error') }
    const promise = sut.execute('any_gift_id')
    expect(promise).rejects.toThrowError(new Error('repo error'))
  })
})

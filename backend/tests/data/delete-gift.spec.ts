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

describe('delete-gift', () => {
  it('should call repository with right gift id', () => {
    const deleteGiftRepo = new DeleteGiftRepositoryMock()
    const sut = new DeleteGiftService(deleteGiftRepo)
    sut.execute('any_gift_id')
    expect(deleteGiftRepo.input).toBe('any_gift_id')
  })
})

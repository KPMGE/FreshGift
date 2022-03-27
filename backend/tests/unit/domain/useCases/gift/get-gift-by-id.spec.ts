interface GetGiftById {
  execute(giftId: string): Promise<void>
}

interface GetGiftByIdRepository {
  getGift(giftId: string): Promise<void>
}

class GetGiftByIdRepositoryMock implements GetGiftByIdRepository {
  input?: string

  async getGift(giftId: string): Promise<void> {
    this.input = giftId
  }
}

class GetGiftByIdService implements GetGiftById {
  constructor(private readonly getGiftBydIdRepository: GetGiftByIdRepository) { }

  async execute(giftId: string): Promise<void> {
    await this.getGiftBydIdRepository.getGift(giftId)
  }
}

describe('get-gift-by-id', () => {
  const fakeGiftId = 'any_gift_id'

  it('should call repository with right data', async () => {
    const getGiftByIdRepository = new GetGiftByIdRepositoryMock()
    const sut = new GetGiftByIdService(getGiftByIdRepository)

    await sut.execute(fakeGiftId)

    expect(getGiftByIdRepository.input).toBe(fakeGiftId)
  })
})

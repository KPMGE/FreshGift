import { MissingParameterError } from "../../../../../src/domain/errors"

interface GetGiftById {
  execute(giftId?: string): Promise<void>
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

  async execute(giftId?: string): Promise<void> {
    if (!giftId) throw new MissingParameterError('giftId')
    await this.getGiftBydIdRepository.getGift(giftId)
  }
}

type SutTypes = {
  sut: GetGiftByIdService,
  getGiftByIdRepository: GetGiftByIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const getGiftByIdRepository = new GetGiftByIdRepositoryMock()
  const sut = new GetGiftByIdService(getGiftByIdRepository)

  return {
    sut,
    getGiftByIdRepository
  }
}


describe('get-gift-by-id', () => {
  const fakeGiftId = 'any_gift_id'

  it('should call repository with right data', async () => {
    const { sut, getGiftByIdRepository } = makeSut()

    await sut.execute(fakeGiftId)

    expect(getGiftByIdRepository.input).toBe(fakeGiftId)
  })


  it('should throw an error if no valid id is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.execute(undefined)

    await expect(promise).rejects.toThrowError(new MissingParameterError('giftId'))
  })
})

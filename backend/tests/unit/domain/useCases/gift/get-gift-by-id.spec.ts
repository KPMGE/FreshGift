import { Gift } from "../../../../../src/domain/entities"
import { MissingParameterError } from "../../../../../src/domain/errors"

interface GetGiftById {
  execute(giftId?: string): Promise<Gift | null>
}

interface GetGiftByIdRepository {
  getGift(giftId: string): Promise<Gift | undefined>
}

class GetGiftByIdRepositoryMock implements GetGiftByIdRepository {
  input?: string
  output?: Gift = {
    id: 'any_gift_id',
    name: 'any_gift_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  async getGift(giftId: string): Promise<Gift | undefined> {
    this.input = giftId
    return this.output;
  }
}

class GetGiftByIdService implements GetGiftById {
  constructor(private readonly getGiftBydIdRepository: GetGiftByIdRepository) { }

  async execute(giftId?: string): Promise<Gift | null> {
    if (!giftId) throw new MissingParameterError('giftId')

    const foundGift = await this.getGiftBydIdRepository.getGift(giftId)

    if (!foundGift) return null

    return foundGift
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

  it('should return null if no gift is found', async () => {
    const { sut, getGiftByIdRepository } = makeSut()
    getGiftByIdRepository.output = undefined

    const foundGift = await sut.execute(fakeGiftId)

    expect(foundGift).toBe(null)
  })

  it('should return the gift with the giftId given', async () => {
    const { sut, getGiftByIdRepository } = makeSut()

    const foundGift = await sut.execute(fakeGiftId)

    expect(foundGift).toEqual(getGiftByIdRepository.output)
  })
})

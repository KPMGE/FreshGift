import { GetGiftByIdService } from "../../../../../src/data/services/gift"
import { MissingParameterError } from "../../../../../src/domain/errors"
import { GetGiftByIdRepositoryMock } from "../../repositories/gift/get-gift-by-id"

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

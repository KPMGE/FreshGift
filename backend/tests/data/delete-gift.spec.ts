import { DeleteGiftRepository, FindGiftRepository } from "../../src/data/contracts"
import { Gift } from "../../src/domain/entities"
import { DeleteGift } from "../../src/domain/useCases"
import { makeFakeGift } from "../domain/mocks/gift"

class FindGiftRepositoryMock implements FindGiftRepository {
  input: any
  output = makeFakeGift()
  async find(giftId: string): Promise<Gift> {
    this.input = giftId
    return this.output
  }
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  input = ""
  output = makeFakeGift()
  async delete(giftId: string): Promise<Gift> {
    this.input = giftId
    return this.output
  }
}

class GiftNotFoundError extends Error {
  constructor() {
    super('gift not found!')
    super.name = 'GiftNotFoundError'
  }
}

class DeleteGiftService implements DeleteGift {
  constructor(
    private readonly deleteGiftRepo: DeleteGiftRepository,
    private readonly findGiftRepo: FindGiftRepository
  ) { }
  async execute(giftId: string): Promise<Gift> {
    const foundGift = await this.findGiftRepo.find(giftId)
    if (!foundGift) throw new GiftNotFoundError()
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
  it('should call repository with right gift id', async () => {
    const { deleteGiftRepo, sut } = makeSut()

    await sut.execute('any_gift_id')

    expect(deleteGiftRepo.input).toEqual('any_gift_id')
  })

  it('should throw if repository throws', async () => {
    const { deleteGiftRepo, sut } = makeSut()
    deleteGiftRepo.delete = () => { throw new Error('repo error') }

    const promise = sut.execute('any_gift_id')

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should return the deleted gift from repository', async () => {
    const { deleteGiftRepo, sut } = makeSut()
    deleteGiftRepo.output = makeFakeGift()

    const deletedGift = await sut.execute('any_gift_id')

    expect(deletedGift).toEqual(makeFakeGift())
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

  it('should throw GiftNotFoundError if no gift was found', () => {
    const { findGiftRepo, sut } = makeSut()
    findGiftRepo.output = null

    const promise = sut.execute('any_gift_id')

    expect(promise).rejects.toThrowError(new GiftNotFoundError())
  })
})

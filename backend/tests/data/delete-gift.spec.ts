import { GiftNotFoundError } from "../../src/data/errors"
import { DeleteGiftService } from "../../src/data/services/gift/delete-gift"
import { makeFakeGift } from "../domain/mocks/gift"
import { DeleteGiftRepositoryMock } from "./mocks/delete-gift"
import { FindGiftByIdRepositoryMock } from "./mocks/find-gift-by-id"


type SutTypes = {
  sut: DeleteGiftService,
  deleteGiftRepo: DeleteGiftRepositoryMock
  findGiftRepo: FindGiftByIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const deleteGiftRepo = new DeleteGiftRepositoryMock()
  const findGiftRepo = new FindGiftByIdRepositoryMock()
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

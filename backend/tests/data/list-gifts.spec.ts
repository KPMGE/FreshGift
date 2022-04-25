import { ListGiftsService } from "../../src/data/services/gift/list-gifts"
import { makeFakeGift } from "../domain/mocks/gift"
import { ListGiftsRepositoryStub } from "./mocks/list-gifts"

type SutTypes = {
  listGiftRepo: ListGiftsRepositoryStub,
  sut: ListGiftsService
}

const makeSut = (): SutTypes => {
  const listGiftRepo = new ListGiftsRepositoryStub()
  const sut = new ListGiftsService(listGiftRepo)
  return {
    listGiftRepo,
    sut
  }
}

describe('list-gifts-service', () => {
  const { sut } = makeSut()
  it('should return right data', async () => {
    const gifts = await sut.execute()
    expect(gifts).toEqual([makeFakeGift(), makeFakeGift()])
  })

  it('should throw if repository throws', async () => {
    const { sut, listGiftRepo } = makeSut()
    listGiftRepo.list = () => { throw new Error('repo error') }
    const promise = sut.execute()
    expect(promise).rejects.toThrow()
  })
}) 

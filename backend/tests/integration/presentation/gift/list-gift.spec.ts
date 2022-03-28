import { ListGiftService } from "../../../../src/data/services/gift"
import { Gift } from "../../../../src/domain/entities"
import { FakeListGiftRepository, FakeSaveGiftRepository } from "../../../../src/infra/repositories"
import { ListGiftController } from "../../../../src/presentation/controllers/gift"

type SutTypes = {
  sut: ListGiftController
}

const makeSut = (): SutTypes => {

  const listGiftRepository = new FakeListGiftRepository()
  const listGiftService = new ListGiftService(listGiftRepository)
  const sut = new ListGiftController(listGiftService)

  return {
    sut
  }
}

describe('list-gifts', () => {
  const fakeGift: Gift = {
    id: 'any_gift_id',
    name: 'any_gift_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  it('should return an empty array if no there is no saved gift', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([])
  })

  it('should list gifts', async () => {
    const saveGiftRespository = new FakeSaveGiftRepository()

    // save 3 gifts
    await saveGiftRespository.save(fakeGift)
    await saveGiftRespository.save(fakeGift)
    await saveGiftRespository.save(fakeGift)

    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response.data.length).toBe(3)
    expect(response.data[0]).toEqual(fakeGift)
    expect(response.statusCode).toBe(200)
  })
})

import { ListGiftsController } from "../../../src/presentation/controllers"
import { ServerError } from "../../../src/presentation/errors"
import { makeFakeGift } from "../../domain/mocks/gift"
import { ListGiftsServiceStub } from "./list-gifts"

type SutTypes = {
  service: ListGiftsServiceStub,
  sut: ListGiftsController
}

const makeSut = (): SutTypes => {
  const service = new ListGiftsServiceStub()
  const sut = new ListGiftsController(service)
  return {
    service,
    sut
  }
}

describe('list-gifts-controller', () => {
  it('should return right data on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([makeFakeGift(), makeFakeGift()])
  })

  it('should return serverError if service throws', async () => {
    const { sut, service } = makeSut()
    service.execute = () => { throw new Error('service error') }
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('service error'))
  })
})

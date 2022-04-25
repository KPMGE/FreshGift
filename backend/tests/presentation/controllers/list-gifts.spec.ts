import { ListGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { ServerError } from "../../../src/presentation/errors"
import { ok, serverError } from "../../../src/presentation/helpers"
import { makeFakeGift } from "../../domain/mocks/gift"
import { ListGiftsServiceStub } from "./list-gifts"

class ListGiftsController implements Controller {
  constructor(private readonly listGiftsService: ListGift) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const gifts = await this.listGiftsService.execute()
      return ok(gifts)
    } catch (error) {
      return serverError(error)
    }
  }
}

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

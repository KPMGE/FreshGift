import { Gift } from "../../../src/domain/entities"
import { ListGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse } from "../../../src/presentation/contracts"
import { ok } from "../../../src/presentation/helpers"
import { makeFakeGift } from "../../domain/mocks/gift"

class ListGiftsServiceStub implements ListGift {
  output = [makeFakeGift(), makeFakeGift()]
  async execute(): Promise<Gift[]> {
    return this.output
  }
}

class ListGiftsController implements Controller {
  constructor(private readonly listGiftsService: ListGift) { }
  async handle(request: any): Promise<HttpResponse> {
    return ok(await this.listGiftsService.execute())
  }
}

describe('list-gifts-controller', () => {
  it('should return right data on success', async () => {
    const service = new ListGiftsServiceStub()
    const sut = new ListGiftsController(service)

    const httpResponse = await sut.handle({})

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([makeFakeGift(), makeFakeGift()])
  })
})

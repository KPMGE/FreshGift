import { Gift } from "../../../src/domain/entities";
import { CreateGift } from "../../../src/domain/useCases";
import { Controller, HttpResponse } from "../../../src/presentation/contracts"

export namespace CreateGiftController {
  export type Request = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
}

class CreateGiftServiceSpy implements CreateGift {
  input
  async execute(gift: CreateGift.Props): Promise<Gift> {
    this.input = gift
    return null
  }
}

const fakeRequest: CreateGiftController.Request = {
  name: "any_name",
  price: 100.2,
  description: "any_description",
  imageUrl: "any_image_url"
}

class CreateGiftController implements Controller {
  constructor(private readonly createGiftService: CreateGift) { }

  async handle(request: CreateGiftController.Request): Promise<HttpResponse> {
    this.createGiftService.execute(request)
    return null
  }
}

describe('create-gift-controller', () => {
  it('should call service with right data', async () => {
    const createGiftService = new CreateGiftServiceSpy()
    const sut = new CreateGiftController(createGiftService)
    await sut.handle(fakeRequest)
    expect(createGiftService.input).toEqual(fakeRequest)
  })
})

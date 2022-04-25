import { Gift } from "../../../src/domain/entities";
import { CreateGift } from "../../../src/domain/useCases";
import { Controller, HttpResponse, Validator } from "../../../src/presentation/contracts"
import { ServerError } from "../../../src/presentation/errors";
import { badRequest, ok, serverError } from "../../../src/presentation/helpers";
import { ValidatorSpy } from "./mocks";

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
  output: Gift = {
    id: 'any_id',
    name: "any_name",
    price: 100.2,
    description: "any_description",
    imageUrl: "any_image_url"
  }
  async execute(gift: CreateGift.Props): Promise<Gift> {
    this.input = gift
    return this.output
  }
}

const fakeRequest: CreateGiftController.Request = {
  name: "any_name",
  price: 100.2,
  description: "any_description",
  imageUrl: "any_image_url"
}

class CreateGiftController implements Controller {
  constructor(private readonly createGiftService: CreateGift, private readonly validator: Validator) { }

  async handle(request: CreateGiftController.Request): Promise<HttpResponse> {
    const error = this.validator.validate(request)
    if (error) return badRequest(error)
    try {
      const createdGift = await this.createGiftService.execute(request)
      return ok(createdGift)
    } catch (err) {
      return serverError(err)
    }
  }
}

type SutTypes = {
  createGiftService: CreateGiftServiceSpy,
  validatorSpy: ValidatorSpy,
  sut: CreateGiftController
}

const makeSut = (): SutTypes => {
  const createGiftService = new CreateGiftServiceSpy()
  const validatorSpy = new ValidatorSpy()
  validatorSpy.output = null
  const sut = new CreateGiftController(createGiftService, validatorSpy)
  return {
    createGiftService,
    sut,
    validatorSpy
  }
}

describe('create-gift-controller', () => {
  it('should call service with right data', async () => {
    const { sut, createGiftService } = makeSut()
    await sut.handle(fakeRequest)
    expect(createGiftService.input).toEqual(fakeRequest)
  })

  it('should return badRequest if validator returns error', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.output = new Error('invalid field')
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('invalid field'))
  })

  it('should return Ok on success', async () => {
    const { sut, createGiftService } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(createGiftService.output)
  })

  it('should return serverError if createGiftService throws', async () => {
    const { sut, createGiftService } = makeSut()
    createGiftService.execute = () => { throw new Error('service error') }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('service error'))
  })
})

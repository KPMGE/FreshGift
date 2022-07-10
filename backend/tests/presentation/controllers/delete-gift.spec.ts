import { GiftNotFoundError } from "../../../src/data/errors"
import { Gift } from "../../../src/domain/entities"
import { DeleteGift } from "../../../src/domain/useCases"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/contracts"
import { ServerError } from "../../../src/presentation/errors"
import { badRequest, ok, serverError } from "../../../src/presentation/helpers"
import { makeFakeGift } from "../../domain/mocks/gift"
import { ValidatorSpy } from "./mocks"

class DeleteGiftServiceSpy implements DeleteGift {
  giftId = ""
  deletedGift = makeFakeGift()
  async execute(giftId: string): Promise<Gift> {
    this.giftId = giftId
    return this.deletedGift
  }
}

class DeleteGiftController implements Controller {
  constructor(
    private readonly deleteGiftService: DeleteGift,
    private readonly validator: Validator
  ) { }

  async handle(request: any): Promise<HttpResponse> {
    const error = this.validator.validate(request)
    if (error) return badRequest(error)

    try {
      const deletedGift = await this.deleteGiftService.execute(request.giftId)
      return ok(deletedGift)
    } catch (error) {
      if (error instanceof GiftNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: DeleteGiftController,
  service: DeleteGiftServiceSpy,
  validator: ValidatorSpy
}

const makeSut = (): SutTypes => {
  const service = new DeleteGiftServiceSpy()
  const validator = new ValidatorSpy()
  const sut = new DeleteGiftController(service, validator)

  return {
    sut,
    service,
    validator
  }
}

describe('delete-gift-controller', () => {
  it('should call service with right giftId', async () => {
    const { service, sut } = makeSut()
    await sut.handle({ giftId: 'any_gift_id' })

    expect(service.giftId).toEqual('any_gift_id')
  })

  it('should call validator with right data', async () => {
    const { validator, sut } = makeSut()

    await sut.handle({ giftId: 'any_gift_id' })

    expect(validator.input).toEqual({ giftId: 'any_gift_id' })
  })

  it('should return badRequest if service returns GiftNotFoundError', async () => {
    const { service, sut } = makeSut()
    service.execute = () => { throw new GiftNotFoundError() }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new GiftNotFoundError())
  })

  it('should return badRequest if validator returns error', async () => {
    const { validator, sut } = makeSut()
    validator.validate = () => { return new Error('validation error') }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('validation error'))
  })

  it('should return serverError if service returns error', async () => {
    const { service, sut } = makeSut()
    service.execute = () => { throw new Error('some strange error') }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('some strange error'))
  })

  it('should return deleted gift on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(makeFakeGift())
  })
})

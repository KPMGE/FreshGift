import { GiftNotFoundError } from "../../../src/data/errors"
import { DeleteGiftController } from "../../../src/presentation/controllers/gift/delete-gift"
import { ServerError } from "../../../src/presentation/errors"
import { makeFakeGift } from "../../domain/mocks/gift"
import { ValidatorSpy } from "./mocks"
import { DeleteGiftServiceSpy } from "./mocks/delete-gift"

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

  it('should return notFound if service returns GiftNotFoundError', async () => {
    const { service, sut } = makeSut()
    service.execute = () => { throw new GiftNotFoundError() }

    const httpResponse = await sut.handle({ giftId: 'any_gift_id' })

    expect(httpResponse.statusCode).toBe(404)
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

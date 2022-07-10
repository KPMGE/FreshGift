import { GiftNameTakenError } from "../../../src/data/errors";
import { CreateGiftController } from "../../../src/presentation/controllers/gift/create-gift";
import { ServerError } from "../../../src/presentation/errors";
import { ValidatorSpy } from "./mocks";
import { CreateGiftServiceSpy } from "./mocks/create-gift-service";

const fakeRequest: CreateGiftController.Request = {
  name: "any_name",
  price: 100.2,
  description: "any_description",
  imageUrl: "any_image_url"
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

  it('should return created on success', async () => {
    const { sut, createGiftService } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual(createGiftService.output)
  })

  it('should return badRequest if createGiftService returns GiftNameTaken error', async () => {
    const { sut, createGiftService } = makeSut()
    createGiftService.execute = () => { throw new GiftNameTakenError() }

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new GiftNameTakenError())
  })


  it('should return serverError if createGiftService throws', async () => {
    const { sut, createGiftService } = makeSut()
    createGiftService.execute = () => { throw new Error('service error') }
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('service error'))
  })
})

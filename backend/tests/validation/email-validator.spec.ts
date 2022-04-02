import { InvalidParamError } from "../../src/presentation/errors"
import { EmailValidation } from "../../src/validation/validators/email-validation"
import { EmailValidatorSpy } from "./mocks"

const fieldName = 'email'

type SutTypes = {
  sut: EmailValidation,
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(fieldName, emailValidatorSpy)
  return {
    emailValidatorSpy,
    sut
  }
}

describe('email-validation', () => {
  const fakeInput = {
    email: 'any_valid_email@gmail.com'
  }

  it('should call email validator with right data', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate(fakeInput)
    expect(emailValidatorSpy.input).toBe(fakeInput.email)
  })

  it('should return error if emailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.output = false
    const error = sut.validate(fakeInput)
    expect(error).toEqual(new InvalidParamError(fieldName))
  })

  it('should throw when EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isValid = () => { throw new Error() }
    expect(sut.validate).toThrow()
  })
})

import { InvalidEmailError } from "../../src/domain/errors"
import { Validator } from "../../src/presentation/contracts"
import { InvalidParamError } from "../../src/presentation/errors"
import { EmailValidator } from "../../src/validation/contracts"

class EmailValidatorSpy implements EmailValidator {
  input?: string
  output: boolean = true
  isValid(email: string): boolean {
    this.input = email
    return this.output
  }
}

class EmailValidation implements Validator {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate(input: any): Error {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isEmailValid) return new InvalidParamError(fieldName)
  }
}

type SutTypes = {
  sut: EmailValidation,
  emailValidatorSpy: EmailValidatorSpy
}

const fieldName = 'email'

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
})

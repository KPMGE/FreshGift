import { Validator } from "../../src/presentation/contracts"
import { EmailValidator } from "../../src/validation/contracts"

class EmailValidatorSpy implements EmailValidator {
  input?: string
  isValid(email: string): boolean {
    this.input = email
    return true
  }
}

class EmailValidation implements Validator {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate(input: any): Error {
    this.emailValidator.isValid(input[this.fieldName])
    return null
  }
}


describe('email-validation', () => {
  const fakeInput = {
    email: 'any_valid_email@gmail.com'
  }

  it('should call email validator with right data', () => {
    const emailValidatorSpy = new EmailValidatorSpy()
    const sut = new EmailValidation('email', emailValidatorSpy)

    sut.validate(fakeInput)

    expect(emailValidatorSpy.input).toBe(fakeInput.email)
  })
})

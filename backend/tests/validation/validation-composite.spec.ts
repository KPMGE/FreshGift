import { Validator } from "../../src/presentation/contracts"
import { MissingParamError } from "../../src/presentation/errors"
import { ValidatorSpy } from "../presentation/controllers/mocks"

class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) { }
  validate(input: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) return error
    }
  }
}

const validators = [new ValidatorSpy(), new ValidatorSpy()]

describe('validation-composite', () => {
  it('should return return error if any validation fails', () => {
    const sut = new ValidationComposite(validators)
    validators[0].output = new MissingParamError('any_param')
    const error = sut.validate({})
    expect(error).toEqual(validators[0].output)
  })
})

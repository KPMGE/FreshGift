import { MissingParamError } from "../../src/presentation/errors"
import { ValidationComposite } from "../../src/validation/validators/validation-composite"
import { ValidatorSpy } from "../presentation/controllers/mocks"

const validators = [new ValidatorSpy(), new ValidatorSpy()]

describe('validation-composite', () => {
  it('should return return error if any validation fails', () => {
    const sut = new ValidationComposite(validators)
    validators[0].output = new MissingParamError('any_param')
    const error = sut.validate({})
    expect(error).toEqual(validators[0].output)
    validators[0].output = null
  })

  it('should not return if all validations succeed', () => {
    const sut = new ValidationComposite(validators)
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })
})

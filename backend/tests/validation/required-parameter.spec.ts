import { Validator } from "../../src/presentation/contracts"
import { MissingParamError } from "../../src/presentation/errors"

class RequiredParameterValidation implements Validator {
  constructor(private readonly parameterName: string) { }
  validate(input: any): Error {
    if (!input[this.parameterName]) return new MissingParamError(this.parameterName)
  }
}

describe('required-parameter-validation', () => {
  const fakeParameter = 'any_required_parameter'
  const fakeInput = {
    [fakeParameter]: 'any_parameter_value'
  }

  it('should return MissingParameterError if an invalid field is provided', () => {
    const sut = new RequiredParameterValidation(fakeParameter)
    const error = sut.validate({ invalidParam: 'any_value' })
    expect(error).toEqual(new MissingParamError(fakeParameter))
  })
})

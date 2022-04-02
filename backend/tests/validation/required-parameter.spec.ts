import { Validator } from "../../src/presentation/contracts"
import { MissingParamError } from "../../src/presentation/errors"

class RequiredParameterValidation implements Validator {
  constructor(private readonly parameterName: string) { }
  validate(input: any): Error {
    if (!input[this.parameterName]) return new MissingParamError(this.parameterName)
  }
}

const fakeParameter = 'any_required_parameter'

type SutTypes = {
  sut: RequiredParameterValidation,
}

const makeSut = (): SutTypes => {
  const sut = new RequiredParameterValidation(fakeParameter)
  return { sut }
}

describe('required-parameter-validation', () => {
  const fakeInput = {
    [fakeParameter]: 'any_parameter_value'
  }

  it('should return MissingParameterError if an invalid field is provided', () => {
    const { sut } = makeSut()
    const error = sut.validate({ invalidParam: 'any_value' })
    expect(error).toEqual(new MissingParamError(fakeParameter))
  })
})

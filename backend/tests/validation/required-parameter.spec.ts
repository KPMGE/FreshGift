import { MissingParamError } from "../../src/presentation/errors"
import { RequiredParameterValidation } from "../../src/validation/validators"

const fakeParameter = 'any_required_parameter'
type SutTypes = {
  sut: RequiredParameterValidation,
}

const makeSut = (): SutTypes => {
  const sut = new RequiredParameterValidation(fakeParameter)
  return { sut }
}

describe('required-parameter-validation', () => {
  const fakeValidInput = {
    [fakeParameter]: 'any_parameter_value'
  }

  it('should return MissingParameterError if an invalid field is provided', () => {
    const { sut } = makeSut()
    const error = sut.validate({ invalidParam: 'any_value' })
    expect(error).toEqual(new MissingParamError(fakeParameter))
  })

  it('should return nothing if the field is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(fakeValidInput)
    expect(error).toBeFalsy()
  })
})

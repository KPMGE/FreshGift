import { InvalidParamError } from "../../src/presentation/errors"
import { CompareFieldsValidation } from "../../src/validation/validators"

describe('compare-fields-validation', () => {
  const fieldName = 'any_name'
  const fieldToCompareName = 'any_other_name'

  it('should return InvalidParamError if the validation does not succeed', () => {
    const sut = new CompareFieldsValidation(fieldName, fieldToCompareName)
    const error = sut.validate({
      [fieldName]: 'any_value',
      [fieldToCompareName]: 'any_other_value'
    })
    expect(error).toEqual(new InvalidParamError(fieldName))
  })

  it('should return nothing if the fields are equal', () => {
    const sut = new CompareFieldsValidation(fieldName, fieldToCompareName)
    const error = sut.validate({
      [fieldName]: 'any_value',
      [fieldToCompareName]: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})

import { Validator } from "../../src/presentation/contracts"
import { InvalidParamError } from "../../src/presentation/errors"

class CompareFieldsValidation implements Validator {
  constructor(private readonly field: string, private readonly fieldToCompare: string) { }
  validate(input: any): Error {
    const areFieldsEqual = input[this.field] === input[this.fieldToCompare]
    if (!areFieldsEqual) return new InvalidParamError(this.field)
  }
}

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
})

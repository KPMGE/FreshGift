import { Validator } from "../../presentation/contracts"
import { InvalidParamError } from "../../presentation/errors"

export class CompareFieldsValidation implements Validator {
  constructor(private readonly field: string, private readonly fieldToCompare: string) { }
  validate(input: any): Error {
    const areFieldsEqual = input[this.field] === input[this.fieldToCompare]
    if (!areFieldsEqual) return new InvalidParamError(this.field)
  }
}

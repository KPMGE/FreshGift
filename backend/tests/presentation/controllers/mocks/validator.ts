import { Validator } from "../../../../src/presentation/contracts"

export class ValidatorSpy implements Validator {
  input
  output
  validate(input: any): Error {
    this.input = input
    return this.output
  }
}

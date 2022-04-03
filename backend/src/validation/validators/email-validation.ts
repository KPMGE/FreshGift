import { Validator } from "../../presentation/contracts"
import { InvalidParamError } from "../../presentation/errors"
import { EmailValidator } from "../contracts"

export class EmailValidation implements Validator {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate(input: any): Error {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isEmailValid) return new InvalidParamError(this.fieldName)
  }
}

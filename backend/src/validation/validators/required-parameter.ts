import { Validator } from "../../presentation/contracts";
import { MissingParamError } from "../../presentation/errors";

export class RequiredParameterValidation implements Validator {
  constructor(private readonly parameterName: string) { }
  validate(input: any): Error {
    if (!input[this.parameterName]) return new MissingParamError(this.parameterName)
  }
}

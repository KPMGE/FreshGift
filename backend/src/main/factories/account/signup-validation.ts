import { RegexEmailValidator } from "../../../infra/validators";
import { CompareFieldsValidation, EmailValidation, RequiredParameterValidation, ValidationComposite } from "../../../validation/validators";

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFiels = ['password', 'confirmPassword', 'email', 'name']
  const validators = []
  for (const fieldName of requiredFiels) {
    validators.push(new RequiredParameterValidation(fieldName))
  }
  validators.push(new EmailValidation('email', new RegexEmailValidator()))
  validators.push(new CompareFieldsValidation('password', 'confirmPassword'))
  return new ValidationComposite(validators)
}

import { EmailValidator } from "../../../src/validation/contracts"

export class EmailValidatorSpy implements EmailValidator {
  input?: string
  output: boolean = true
  isValid(email: string): boolean {
    this.input = email
    return this.output
  }
}

import { CheckAccountByEmailRepository } from "../../../src/data/contracts"

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  input?: string
  output: boolean = false
  async check(email: string): Promise<boolean> {
    this.input = email
    return this.output
  }
}

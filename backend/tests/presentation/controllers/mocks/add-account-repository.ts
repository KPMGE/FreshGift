import { AddAccountRepository } from "../../../../src/data/contracts"

export class AddAccountRepositorySpy implements AddAccountRepository {
  input
  output = true
  async add(account: AddAccountRepository.Props): Promise<boolean> {
    this.input = account
    return this.output
  }
}

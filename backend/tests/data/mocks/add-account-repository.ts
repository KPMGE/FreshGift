import { AddAccountRepository } from "../../../src/data/contracts"

export class AddAccountRepositorySpy implements AddAccountRepository {
  input?: AddAccountRepository.Props
  output: boolean = true

  async add(account: AddAccountRepository.Props): Promise<boolean> {
    this.input = account
    return this.output
  }
}

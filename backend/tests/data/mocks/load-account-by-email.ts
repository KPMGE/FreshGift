import { LoadAccountByEmailRepository } from "../../../src/data/contracts"

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  input?: string
  output = {
    id: 'any_id',
    password: 'any_password',
    name: 'any_name'
  }
  async load(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.input = email
    return this.output
  }
}

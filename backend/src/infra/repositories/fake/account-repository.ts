import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateTokenRepository } from "../../../data/contracts";
import { AddAccountUseCase } from "../../../domain/useCases";

let accounts: AddAccountUseCase.Props[] = []

export class FakeAccountRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateTokenRepository {
  async add(account: AddAccountUseCase.Props): Promise<boolean> {
    accounts.push(account)
    return true
  }

  async check(email: string): Promise<boolean> {
    return accounts.some(account => account.email === email)
  }

  async load(email: string): Promise<LoadAccountByEmailRepository.Result> {
    const foundAccount = accounts.find(account => account.email === email)
    if (!foundAccount) return null
    return {
      id: 'any_id',
      name: foundAccount.name,
      password: foundAccount.password
    }
  }

  async update(id: string, token: string): Promise<void> {
    console.log("Update accessToken")
  }
}

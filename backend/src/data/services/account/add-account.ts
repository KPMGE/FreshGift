import { AddAccountUseCase } from "../../../domain/useCases"
import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from "../../contracts"

export class AddAccountService implements AddAccountUseCase {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }
  async execute(account: AddAccountUseCase.Props): Promise<boolean> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(account.email)
    if (accountAlreadyExists) return false
    const hashedPassword = await this.hasher.hash(account.password)
    const wasAccountAdded = await this.addAccountRepository.add({ ...account, password: hashedPassword })
    return wasAccountAdded
  }
}

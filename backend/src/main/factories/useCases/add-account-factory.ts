import { AddAccountService } from "../../../data/services";
import { BcryptAdapter } from "../../../infra/cryptography";
import { FakeAccountRepository } from "../../../infra/repositories";

export const makeAddAccount = (): AddAccountService => {
  const salt = 8
  const fakeAccountRepository = new FakeAccountRepository()
  const hasher = new BcryptAdapter(salt)
  const service = new AddAccountService(fakeAccountRepository, hasher, fakeAccountRepository)
  return service
}

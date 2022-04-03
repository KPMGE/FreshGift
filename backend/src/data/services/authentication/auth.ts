import { AuthenticationUseCase } from "../../../domain/useCases"
import { LoadAccountByEmailRepository, UpdateTokenRepository } from "../../contracts"
import { Encrypter, HashComparer } from "../../providers"

export class AuthenticationService {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository
  ) { }
  async execute({ email, password }: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) return null
    const isPasswordCorrect = await this.hashComparer.compare(password, account.password)
    if (!isPasswordCorrect) return null
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateTokenRepository.update(account.id, accessToken)
    return {
      accessToken,
      name: account.name
    }
  }
}

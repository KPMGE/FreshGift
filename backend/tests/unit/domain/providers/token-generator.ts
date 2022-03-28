import { TokenGeneratorProvider } from "../../../../src/data/providers"

export class TokenGeneratorProviderSpy implements TokenGeneratorProvider {
  input?: string

  generate(userId: string): string {
    this.input = userId
    return 'any_token'
  }
}

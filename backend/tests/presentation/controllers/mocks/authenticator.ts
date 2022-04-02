import { AuthenticationUseCase } from "../../../../src/domain/useCases"

export class AuthenticatorSpy implements AuthenticationUseCase {
  input
  output = {
    name: 'any_name',
    accessToken: 'any_access_token'
  }
  async execute(input: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result> {
    this.input = input
    return this.output
  }
}

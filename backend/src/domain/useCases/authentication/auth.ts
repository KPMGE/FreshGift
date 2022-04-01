export interface AuthenticationUseCase {
  execute(input: AuthenticationUseCase.Props): Promise<AuthenticationUseCase.Result>
}

export namespace AuthenticationUseCase {
  export type Props = {
    password: string
    email: string
  }
  export type Result = {
    accessToken: string
    name: string
  }
}

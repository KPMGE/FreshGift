export interface AddAccountUseCase {
  execute(account: AddAccountUseCase.Props): Promise<boolean>
}

export namespace AddAccountUseCase {
  export type Props = {
    name: string,
    email: string,
    password: string
  }
}

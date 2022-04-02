import { AddAccountUseCase } from "../../../domain/useCases"

export interface AddAccountRepository {
  add(account: AddAccountRepository.Props): Promise<boolean>
}

export namespace AddAccountRepository {
  export type Props = AddAccountUseCase.Props
}

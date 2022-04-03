import { AddAccountRepository } from "../../../data/contracts"
import { AuthenticationUseCase } from "../../../domain/useCases"
import { Controller, HttpResponse, Validator } from "../../contracts"
import { EmailInUseError } from "../../errors"
import { badRequest, forbidden, ok, serverError } from "../../helpers"

export class SignUpController implements Controller {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly authenticator: AuthenticationUseCase,
    private readonly validator: Validator
  ) { }
  async handle({ name, email, password, confirmPassword }: SignUpController.Props): Promise<HttpResponse> {
    try {
      const wasAccountAdded = await this.addAccountRepository.add({ name, email, password })
      if (!wasAccountAdded) return forbidden(new EmailInUseError())
      const error = this.validator.validate({ name, email, password, confirmPassword })
      if (error) return badRequest(error)
      const authenticatedAccount = await this.authenticator.execute({ email, password })
      return ok(authenticatedAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Props = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
}

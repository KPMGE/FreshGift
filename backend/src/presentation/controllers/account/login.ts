import { AuthenticationUseCase } from "../../../domain/useCases"
import { Controller, HttpResponse, Validator } from "../../contracts"
import { badRequest, ok, serverError, unauthorized } from "../../helpers"

export class LoginCtontroller implements Controller {
  constructor(
    private readonly authenticator: AuthenticationUseCase,
    private readonly validator: Validator
  ) { }
  async handle(request: any): Promise<HttpResponse> {
    try {
      const auth = await this.authenticator.execute(request)
      if (!auth) return unauthorized()
      const error = this.validator.validate(request)
      if (error) return badRequest(error)
      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}


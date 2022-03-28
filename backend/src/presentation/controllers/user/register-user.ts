import { RegisterUserService } from "../../../data/services/user"
import { InvalidEmailError, MissingParameterError, PasswordsDontMatchError } from "../../../domain/errors"
import { RegisterUser } from "../../../domain/useCases/user"
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class RegisterUserController implements Controller {
  constructor(private readonly registerUserService: RegisterUser) { }

  async handle(req?: HttpRequest<RegisterUserService.Props>): Promise<HttpResponse<string>> {
    try {
      const registeredUser = await this.registerUserService.execute(req?.body)
      return ok(registeredUser)
    } catch (error) {
      if (error instanceof MissingParameterError) return badRequest(error.message)
      if (error instanceof PasswordsDontMatchError) return badRequest(error.message)
      if (error instanceof InvalidEmailError) return badRequest(error.message)
      return serverError(error as Error)
    }
  }
}

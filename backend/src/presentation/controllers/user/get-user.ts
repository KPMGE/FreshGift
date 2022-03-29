import { GetUserService } from "../../../data/services/user/get-user"
import { MissingParameterError } from "../../../domain/errors"
import { GetUser } from "../../../domain/useCases/user"
import { HttpRequest, HttpResponse, ok, resourceNotFoundError, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class GetUserController implements Controller {
  constructor(private readonly getUserService: GetUser) { }

  async handle(req?: HttpRequest): Promise<HttpResponse<GetUserService.Result>> {
    try {
      const foundUser = await this.getUserService.execute(req?.params.userId)
      return ok(foundUser)
    } catch (error) {
      if (error instanceof MissingParameterError) return resourceNotFoundError(error.message)
      return serverError(error as Error)
    }
  }
}

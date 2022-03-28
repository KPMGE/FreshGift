import { UserDTO } from "../../../data/DTO"
import { CannotDeleteUserError } from "../../../domain/errors"
import { DeleteUser } from "../../../domain/useCases/user"
import { badRequest, HttpRequest, HttpResponse, ok, serverError } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUserService: DeleteUser) { }

  async handle(req?: HttpRequest<{ userId: string }>): Promise<HttpResponse<UserDTO>> {
    try {
      const deletedUser = await this.deleteUserService.execute(req?.body?.userId)
      return ok(deletedUser)
    } catch (error) {
      if (error instanceof CannotDeleteUserError) return badRequest(error.message)
      return serverError(error as Error)
    }
  }
}


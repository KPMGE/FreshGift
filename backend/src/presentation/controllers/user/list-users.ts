import { ListUser } from "../../../domain/useCases/user"
import { HttpResponse, ok } from "../../contracts"
import { Controller } from "../../contracts/controller"

export class ListUsersController implements Controller {
  constructor(private readonly listUsersService: ListUser) { }

  async handle(): Promise<HttpResponse<ListUser.Result[]>> {
    const listUsers = await this.listUsersService.execute()
    return ok(listUsers)
  }
}

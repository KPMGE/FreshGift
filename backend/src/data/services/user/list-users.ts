import { ListUser } from "../../../domain/useCases/user";
import { ListUsersRepository } from "../../contracts/user/list-users-repository";

export class ListUsersService implements ListUser {
  constructor(private readonly listUsersRepository: ListUsersRepository) { }

  async execute(): Promise<ListUser.Result[]> {
    return await this.listUsersRepository.list()
  }
}

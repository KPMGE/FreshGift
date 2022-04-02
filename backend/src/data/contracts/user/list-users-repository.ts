import { ListUser } from "../../../domain/useCases/user";

export interface ListUsersRepository {
  list(): Promise<ListUser.Result[]>
}

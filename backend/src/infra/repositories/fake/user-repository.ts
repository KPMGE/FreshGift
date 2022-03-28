import { RegisterUserRepository } from "../../../data/contracts/user";
import { UserDTO } from "../../../data/DTO";
import { User } from "../../../domain/entities";

let listUsers: UserDTO[] = []

export class FakeRegisterUserRepository implements RegisterUserRepository {
  async register(user: User): Promise<void> {
    listUsers.push(user)
  }
}

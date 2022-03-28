import { User } from "../../../../../src/domain/entities";
import { RegisterUserRepository } from "../../../../../src/data/contracts/user";

export class RegisterUserRepositorySpy implements RegisterUserRepository {
  user?: User;

  async register(user: User): Promise<void> {
    this.user = user;
  }
}

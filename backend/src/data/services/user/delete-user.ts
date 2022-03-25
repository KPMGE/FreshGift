import { User } from "../../../domain/entities";
import { MissingParameterError } from "../../../domain/errors";
import { DeleteUser } from "../../../domain/useCases/user";
import { DeleteUserRepository } from "../../contracts/user";

export class DeleteUserService implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new MissingParameterError("userId");
    }

    return this.deleteUserRepository.delete(userId);
  }
}

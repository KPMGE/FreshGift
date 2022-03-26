import { User } from "../../../domain/entities"
import { MissingParameterError } from "../../../domain/errors"
import { GetUser } from "../../../domain/useCases/user"
import { GetUserRepository } from "../../contracts/user"

export class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepository) { }

  async execute(userId: string): Promise<User> {
    if (!userId) throw new MissingParameterError('userId')
    return this.getUserRepository.get(userId)
  }
}

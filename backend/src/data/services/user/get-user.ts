import { MissingParameterError } from "../../../domain/errors"
import { GetUser } from "../../../domain/useCases/user"
import { GetUserRepository } from "../../contracts/user"

export class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepository) { }

  async execute(userId: string): Promise<GetUser.Result> {
    if (!userId) throw new MissingParameterError('userId')
    const foundUser = await this.getUserRepository.get(userId)

    return {
      name: foundUser.name,
      email: foundUser.email,
      userName: foundUser.userName,
      savedGifts: foundUser.savedGifts
    }
  }
}

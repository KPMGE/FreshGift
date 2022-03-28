import { MissingParameterError } from "../../../domain/errors"
import { GetUser } from "../../../domain/useCases/user"
import { GetUserRepository } from "../../contracts/user"

export class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepository) { }

  async execute(userId: string): Promise<GetUser.Result | null> {
    if (!userId) throw new MissingParameterError('userId')

    const foundUser = await this.getUserRepository.get(userId)

    if (!foundUser) return null

    return {
      name: foundUser.name,
      email: foundUser.email,
      userName: foundUser.userName,
      savedGifts: foundUser.savedGifts
    }
  }
}

import { MissingParameterError } from "../../../domain/errors"
import { GetUser } from "../../../domain/useCases/user"
import { GetUserRepository } from "../../contracts/user"
import { GiftDTO } from "../../DTO"

export namespace GetUserService {
  export type Result = {
    id: string
    name: string
    email: string
    userName: string
    savedGifts: GiftDTO[]
  }
}

export class GetUserService implements GetUser {
  constructor(private readonly getUserRepository: GetUserRepository) { }

  async execute(userId: string): Promise<GetUserService.Result | null> {
    if (!userId) throw new MissingParameterError('userId')

    const foundUser = await this.getUserRepository.get(userId)

    if (!foundUser) return null

    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      userName: foundUser.userName,
      savedGifts: foundUser.savedGifts
    }
  }
}

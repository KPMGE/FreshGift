import { Gift, User } from "../../entities";

export interface RegisterUser {
  execute(user: User): Promise<RegisterUser.Result>
}

export namespace RegisterUser {
  export type Result = {
    id: string
    name: string
    userName: string
    email: string
    savedGifts: Gift[]
  }
}

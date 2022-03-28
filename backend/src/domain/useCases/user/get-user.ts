import { Gift } from "../../entities";

export namespace GetUser {
  export type Result = {
    name: string
    userName: string
    email: string
    savedGifts: Gift[]
  }
}

export interface GetUser {
  execute(userId: string): Promise<GetUser.Result | null>
}

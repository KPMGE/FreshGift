import { Gift } from "../../entities"

export namespace ListUser {
  export type Result = {
    id: string
    name: string
    email: string
    userName: string
    savedGifts: Gift[]
  }
}

export interface ListUser {
  execute(): Promise<ListUser.Result[]>
}

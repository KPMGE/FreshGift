import { Gift } from "../../entities"

export interface CreateGift {
  execute(gift: CreateGift.Props): Promise<Gift>
}

export namespace CreateGift {
  export type Props = Omit<Gift, 'id'>
}

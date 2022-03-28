import { Gift } from "../../entities";

export interface UpdateGift {
  execute(giftId?: string, newGift?: UpdateGift.Props): Promise<Gift | null>
}

export namespace UpdateGift {
  export type Props = Omit<Gift, 'id'>
}

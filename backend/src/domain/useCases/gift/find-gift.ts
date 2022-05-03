import { Gift } from "../../entities";

export interface FindGift {
  execute(giftId: string): Promise<Gift>
}

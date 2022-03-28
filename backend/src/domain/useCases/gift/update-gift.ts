import { Gift } from "../../entities";

export type UpdateGiftProps = Omit<Gift, 'id'>

export interface UpdateGift {
  execute(giftId?: string, newGift?: UpdateGiftProps): Promise<Gift | null>;
}

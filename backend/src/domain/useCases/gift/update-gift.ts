import { Gift } from "../../entities";

export interface UpdateGift {
  execute(giftId: string): Promise<Gift>;
}

import { Gift } from "../../entities";

export interface DeleteGift {
  execute(giftId?: string): Promise<Gift>;
}

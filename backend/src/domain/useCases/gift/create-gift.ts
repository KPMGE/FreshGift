import { Gift } from "../entities";

export interface CreateGift {
  execute(gift: Gift): Promise<Gift>;
}

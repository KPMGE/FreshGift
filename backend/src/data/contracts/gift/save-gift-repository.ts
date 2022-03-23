import { Gift } from "../../entities";

export interface SaveGiftRepository {
  save(gift: Gift): Promise<Gift>;
}

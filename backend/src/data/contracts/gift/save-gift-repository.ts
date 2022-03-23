import { GiftDTO } from "../../DTO";

export interface SaveGiftRepository {
  save(gift: GiftDTO): Promise<GiftDTO>;
}

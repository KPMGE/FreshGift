import { GiftDTO } from "../../DTO";

export interface UpdateGiftRepository {
  update(giftId: string): Promise<GiftDTO>;
}

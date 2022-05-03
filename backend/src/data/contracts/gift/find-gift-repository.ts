import { GiftDTO } from "../../DTO";

export interface FindGiftRepository {
  find(giftId: string): Promise<GiftDTO>
}

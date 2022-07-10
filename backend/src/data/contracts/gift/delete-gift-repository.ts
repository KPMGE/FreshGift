import { GiftDTO } from "../../DTO";

export interface DeleteGiftRepository {
  delete(giftId: string): Promise<GiftDTO>
}

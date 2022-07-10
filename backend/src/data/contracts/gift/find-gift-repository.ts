import { GiftDTO } from "../../DTO";

export interface FindGiftByIdRepository {
  find(giftId: string): Promise<GiftDTO>
}

import { GiftDTO } from "../../DTO";

export interface GetGiftByIdRepository {
  getGift(giftId: string): Promise<GiftDTO | undefined>
}

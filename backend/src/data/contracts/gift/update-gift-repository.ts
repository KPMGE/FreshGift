import { UpdateGiftProps } from "../../../domain/useCases/gift";
import { GiftDTO } from "../../DTO";

export interface UpdateGiftRepository {
  update(giftId?: string, newGift?: UpdateGiftProps): Promise<GiftDTO | undefined>;
}

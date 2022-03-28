import { UpdateGift } from "../../../domain/useCases/gift";
import { GiftDTO } from "../../DTO";

export interface UpdateGiftRepository {
  update(giftId?: string, newGift?: UpdateGift.Props): Promise<GiftDTO | undefined>;
}

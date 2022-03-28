import { UpdateGiftRepository } from "../../../../../src/data/contracts/gift";
import { GiftDTO } from "../../../../../src/data/DTO";
import { UpdateGiftProps } from "../../../../../src/domain/useCases/gift";

export class UpdateGiftRepositorySpy implements UpdateGiftRepository {
  giftId?: string;
  newGift?: UpdateGiftProps
  callsCount: number = 0;
  output?: GiftDTO = {
    id: "any_gift_id",
    name: "any_name",
    description: "any_description",
    price: 1,
    imageUrl: "any_image",
  };

  async update(giftId?: string, newGift?: UpdateGiftProps): Promise<GiftDTO | undefined> {
    this.giftId = giftId
    this.newGift = newGift
    this.callsCount++
    return this.output
  }
}

import { UpdateGiftRepository } from "../../../../../src/data/contracts/gift";
import { GiftDTO } from "../../../../../src/data/DTO";

export class UpdateGiftRepositorySpy implements UpdateGiftRepository {
  giftId?: string;
  callsCount: number = 0;
  output?: GiftDTO = {
    id: "any_gift_id",
    name: "any_name",
    description: "any_description",
    price: 1,
    imageUrl: "any_image",
  };

  async update(giftId: string): Promise<GiftDTO | undefined> {
    this.giftId = giftId;
    this.callsCount++;
    return this.output;
  }
}

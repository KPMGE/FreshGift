import { GiftDTO } from "../../../../../src/data/DTO";
import { DeleteGiftRepository } from "../../../../../src/data/contracts/gift";

export class DeleteGiftRepositorySpy implements DeleteGiftRepository {
  giftId?: string;
  callsCount = 0;
  output: GiftDTO = {
    id: "any_gift_id",
    name: "any_gift_name",
    description: "any_gift_description",
    price: 0,
    imageUrl: "any_gift_image",
  };

  async delete(giftId: string): Promise<GiftDTO> {
    this.callsCount++;
    this.giftId = giftId;
    return this.output;
  }
}

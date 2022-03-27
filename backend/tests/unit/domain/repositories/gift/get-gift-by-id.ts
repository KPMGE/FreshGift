import { GetGiftByIdRepository } from "../../../../../src/data/contracts/gift/get-gift-by-id-repository";
import { GiftDTO } from "../../../../../src/data/DTO";

export class GetGiftByIdRepositoryMock implements GetGiftByIdRepository {
  input?: string
  output?: GiftDTO = {
    id: 'any_gift_id',
    name: 'any_gift_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  async getGift(giftId: string): Promise<GiftDTO | undefined> {
    this.input = giftId
    return this.output;
  }
}

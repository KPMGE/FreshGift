import { GiftDTO } from "../../../../../src/data/DTO";
import { GetRandomGiftProvider } from "../../../../../src/data/providers/";

export class GetRandomGiftProviderStub implements GetRandomGiftProvider {
  output: GiftDTO = {
    id: "any_gift_id",
    name: "gift",
    price: 1,
    imageUrl: "imageUrl",
    description: "description",
  };

  async get(): Promise<GiftDTO> {
    return this.output;
  }
}

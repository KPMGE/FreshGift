import { GiftDTO } from "../../../../../src/data/DTO";
import { GetRandomBookProvider } from "../../../../../src/data/providers/";

export class GetRandomBookProviderStub implements GetRandomBookProvider {
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

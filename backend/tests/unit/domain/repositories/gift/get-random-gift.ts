import { GetRandomGiftProvider, RandomGiftType } from "../../../../../src/data/providers/";
import { GiftPrice } from "../../../../../src/domain/useCases/gift";

export class GetRandomGiftProviderStub implements GetRandomGiftProvider {
  output?: RandomGiftType = {
    name: 'any_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  async get(input: GiftPrice): Promise<RandomGiftType | undefined> {
    return this.output;
  }
}

import { GetRandomGiftProvider } from "../../../../../src/data/providers/";
import { GetRandomGift } from "../../../../../src/domain/useCases/gift";

export class GetRandomGiftProviderStub implements GetRandomGiftProvider {
  input?: GetRandomGift.Props
  output?: GetRandomGift.Result = {
    name: 'any_name',
    price: 100,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }

  async get(input: GetRandomGift.Props): Promise<GetRandomGift.Result | undefined> {
    this.input = input
    return this.output;
  }
}

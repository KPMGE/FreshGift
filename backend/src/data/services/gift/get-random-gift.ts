import { GetRandomGift } from "../../../domain/useCases/gift";
import { GetRandomGiftProvider } from "../../providers";

export class GetRandomGiftService implements GetRandomGift {
  constructor(private readonly getRandomGiftProvider: GetRandomGiftProvider) { }

  async execute(input: GetRandomGift.Props): Promise<GetRandomGift.Result | undefined> {
    return this.getRandomGiftProvider.get(input);
  }
}

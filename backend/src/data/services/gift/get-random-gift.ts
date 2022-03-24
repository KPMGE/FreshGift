import { GetRandomGift, GiftPrice } from "../../../domain/useCases/gift";
import { GiftDTO } from "../../DTO";
import { GetRandomGiftProvider } from "../../providers";

export class GetRandomGiftService implements GetRandomGift {
  constructor(private readonly getRandomGiftProvider: GetRandomGiftProvider) {}

  async execute(input: GiftPrice): Promise<GiftDTO | undefined> {
    return this.getRandomGiftProvider.get();
  }
}

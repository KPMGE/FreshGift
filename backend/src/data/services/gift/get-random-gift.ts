import { GetRandomGift, GiftPrice } from "../../../domain/useCases/gift";
import { GetRandomGiftProvider, RandomGiftType } from "../../providers";

export class GetRandomGiftService implements GetRandomGift {
  constructor(private readonly getRandomGiftProvider: GetRandomGiftProvider) { }

  async execute(input: GiftPrice): Promise<RandomGiftType | undefined> {
    return this.getRandomGiftProvider.get(input);
  }
}

import { GetRandomGift } from "../../domain/useCases/gift";

export interface GetRandomGiftProvider {
  get(input: GetRandomGift.Props): Promise<GetRandomGift.Result | undefined>;
}

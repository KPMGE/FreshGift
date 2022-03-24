import { Gift } from "../../entities";

export type GiftPrice = {
  min: number;
  max: number;
};

export interface GetRandomGift {
  execute(input: GiftPrice): Promise<Gift | undefined>;
}

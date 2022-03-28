import { RandomGiftType } from "../../../data/providers";

export type GiftPrice = {
  min: number;
  max: number;
};

export interface GetRandomGift {
  execute(input: GiftPrice): Promise<RandomGiftType | undefined>;
}

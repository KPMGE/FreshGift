import { GiftPrice } from "../../domain/useCases/gift";
import { GiftDTO } from "../DTO";

export type RandomGiftType = Omit<GiftDTO, 'id'>

export interface GetRandomGiftProvider {
  get(input: GiftPrice): Promise<RandomGiftType | undefined>;
}

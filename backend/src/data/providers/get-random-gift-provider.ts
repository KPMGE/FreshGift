import { GiftDTO } from "../DTO";

export interface GetRandomGiftProvider {
  get(): Promise<GiftDTO>;
}

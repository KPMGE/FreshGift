import { GiftDTO } from "../DTO";

export interface GetRandomBookProvider {
  get(): Promise<GiftDTO>;
}

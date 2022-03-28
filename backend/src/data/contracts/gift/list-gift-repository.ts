import { GiftDTO } from "../../DTO";

export interface ListGiftRepository {
  list(): Promise<GiftDTO[]>;
}

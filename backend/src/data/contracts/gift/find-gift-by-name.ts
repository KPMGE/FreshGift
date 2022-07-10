import { GiftDTO } from "../../DTO"

export interface FindGiftByNameRepository {
  find(name: string): Promise<GiftDTO>
}

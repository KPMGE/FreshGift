import { Gift } from "../../../domain/entities"
import { GiftDTO } from "../../DTO"

export interface SaveGiftRepository {
  save(gift: GiftDTO): Promise<Gift>
}

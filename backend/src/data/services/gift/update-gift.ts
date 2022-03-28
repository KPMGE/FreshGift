import { UpdateGift } from "../../../domain/useCases/gift";
import { UpdateGiftRepository } from "../../contracts/gift";
import { GiftDTO } from "../../DTO";

export class UpdateGiftService implements UpdateGift {
  constructor(private readonly updateGiftRepository: UpdateGiftRepository) { }

  async execute(giftId?: string, newGift?: UpdateGift.Props): Promise<GiftDTO | null> {
    const foundGift = await this.updateGiftRepository.update(giftId, newGift)
    if (!foundGift) return null
    return foundGift
  }
}

import { UpdateGift } from "../../../domain/useCases/gift";
import { UpdateGiftRepository } from "../../contracts/gift";
import { GiftDTO } from "../../DTO";

export class UpdateGiftService implements UpdateGift {
  constructor(private readonly updateGiftRepository: UpdateGiftRepository) {}

  async execute(giftId: string): Promise<GiftDTO> {
    return await this.updateGiftRepository.update(giftId);
  }
}

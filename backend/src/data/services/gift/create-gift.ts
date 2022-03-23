import { GiftDTO } from "../../DTO";
import { CreateGift } from "../../../domain/useCases/gift";
import { SaveGiftRepository } from "../../contracts/gift";

export class CreateGiftService implements CreateGift {
  constructor(private readonly saveGiftRepository: SaveGiftRepository) {}

  async execute(gift: GiftDTO): Promise<GiftDTO> {
    return this.saveGiftRepository.save(gift);
  }
}

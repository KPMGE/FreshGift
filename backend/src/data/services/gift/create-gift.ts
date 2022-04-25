import { CreateGift } from "../../../domain/useCases"
import { SaveGiftRepository } from "../../contracts"
import { GiftDTO } from "../../DTO"

export class CreateGiftService implements CreateGift {
  constructor(
    private readonly giftRepo: SaveGiftRepository,
    private readonly idGenerator: IdGenerator
  ) { }

  async execute(gift: CreateGift.Props): Promise<GiftDTO> {
    const newGift = { ...gift, id: this.idGenerator.generate() }
    const savedGift = await this.giftRepo.save(newGift)
    return savedGift
  }
}

import { CreateGift } from "../../../domain/useCases"
import { SaveGiftRepository } from "../../contracts"
import { FindGiftByNameRepository } from "../../contracts/gift/find-gift-by-name"
import { GiftDTO } from "../../DTO"
import { GiftNameTakenError } from "../../errors"

export class CreateGiftService implements CreateGift {
  constructor(
    private readonly giftRepo: SaveGiftRepository,
    private readonly idGenerator: IdGenerator,
    private readonly findGiftByName: FindGiftByNameRepository
  ) { }

  async execute(gift: CreateGift.Props): Promise<GiftDTO> {
    const nameAlreadyTaken = await this.findGiftByName.find(gift.name)
    if (nameAlreadyTaken) throw new GiftNameTakenError()
    const newGift = { ...gift, id: this.idGenerator.generate() }
    const savedGift = await this.giftRepo.save(newGift)
    return savedGift
  }
}

import { GiftDTO } from "../../DTO"
import { CreateGift } from "../../../domain/useCases/gift"
import { SaveGiftRepository } from "../../contracts/gift"
import { MissingParameterError } from "../../../domain/errors"
import { RandomIdGeneratorProvider } from "../../providers"

export class CreateGiftService implements CreateGift {
  constructor(
    private readonly saveGiftRepository: SaveGiftRepository,
    private readonly randomIdGenerator: RandomIdGeneratorProvider
  ) { }

  async execute(gift: CreateGift.Props): Promise<GiftDTO> {
    if (!gift) throw new MissingParameterError('gift')
    if (!gift.name) throw new MissingParameterError('gift.name')
    if (!gift.description) throw new MissingParameterError('gift.description')
    if (!gift.imageUrl) throw new MissingParameterError('gift.imageUrl')
    if (!gift.price) throw new MissingParameterError('gift.price')

    const giftId = this.randomIdGenerator.generate()
    const newGift: GiftDTO = { ...gift, id: giftId }

    return this.saveGiftRepository.save(newGift)
  }
}

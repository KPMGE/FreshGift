import { GiftDTO } from "../../DTO";
import { CreateGift } from "../../../domain/useCases/gift";
import { SaveGiftRepository } from "../../contracts/gift";
import { MissingParameterError } from "../../../domain/errors";

export class CreateGiftService implements CreateGift {
  constructor(private readonly saveGiftRepository: SaveGiftRepository) { }

  async execute(gift: GiftDTO): Promise<GiftDTO> {
    if (!gift) throw new MissingParameterError('gift')
    if (!gift.name) throw new MissingParameterError('gift.name')
    if (!gift.description) throw new MissingParameterError('gift.description')
    if (!gift.imageUrl) throw new MissingParameterError('gift.imageUrl')
    if (!gift.id) throw new MissingParameterError('gift.id')
    if (!gift.price) throw new MissingParameterError('gift.price')

    return this.saveGiftRepository.save(gift);
  }
}

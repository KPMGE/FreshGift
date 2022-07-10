import { DeleteGift } from "../../../domain/useCases"
import { DeleteGiftRepository, FindGiftByIdRepository } from "../../contracts"
import { GiftDTO } from "../../DTO"
import { GiftNotFoundError } from "../../errors"

export class DeleteGiftService implements DeleteGift {
  constructor(
    private readonly deleteGiftRepo: DeleteGiftRepository,
    private readonly findGiftRepo: FindGiftByIdRepository
  ) { }
  async execute(giftId: string): Promise<GiftDTO> {
    const foundGift = await this.findGiftRepo.find(giftId)
    if (!foundGift) throw new GiftNotFoundError()
    const deletedGift = await this.deleteGiftRepo.delete(giftId)
    return deletedGift
  }
}

import { MissingParameterError } from "../../../domain/errors"
import { GetGiftById } from "../../../domain/useCases/gift"
import { GetGiftByIdRepository } from "../../contracts/gift/get-gift-by-id-repository"
import { GiftDTO } from "../../DTO"

export class GetGiftByIdService implements GetGiftById {
  constructor(private readonly getGiftBydIdRepository: GetGiftByIdRepository) { }

  async execute(giftId?: string): Promise<GiftDTO | null> {
    if (!giftId) throw new MissingParameterError('giftId')

    const foundGift = await this.getGiftBydIdRepository.getGift(giftId)

    if (!foundGift) return null

    return foundGift
  }
}

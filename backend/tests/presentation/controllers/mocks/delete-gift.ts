import { GiftDTO } from "../../../../src/data/DTO"
import { DeleteGift } from "../../../../src/domain/useCases"
import { makeFakeGift } from "../../../domain/mocks/gift"

export class DeleteGiftServiceSpy implements DeleteGift {
  giftId = ""
  deletedGift = makeFakeGift()

  async execute(giftId: string): Promise<GiftDTO> {
    this.giftId = giftId
    return this.deletedGift
  }
}

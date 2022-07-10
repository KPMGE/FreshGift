import { DeleteGiftRepository } from "../../../src/data/contracts"
import { GiftDTO } from "../../../src/data/DTO"
import { makeFakeGift } from "../../domain/mocks/gift"

export class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  input = ""
  output = makeFakeGift()
  async delete(giftId: string): Promise<GiftDTO> {
    this.input = giftId
    return this.output
  }
}

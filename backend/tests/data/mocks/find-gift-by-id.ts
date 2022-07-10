import { FindGiftByIdRepository } from "../../../src/data/contracts"
import { GiftDTO } from "../../../src/data/DTO"
import { makeFakeGift } from "../../domain/mocks/gift"

export class FindGiftByIdRepositoryMock implements FindGiftByIdRepository {
  input: any
  output = makeFakeGift()
  async find(giftId: string): Promise<GiftDTO> {
    this.input = giftId
    return this.output
  }
}

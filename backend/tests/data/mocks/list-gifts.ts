import { ListGiftRepository } from "../../../src/data/contracts"
import { Gift } from "../../../src/domain/entities"
import { makeFakeGift } from "../../domain/mocks/gift"

export class ListGiftsRepositoryStub implements ListGiftRepository {
  output = [makeFakeGift(), makeFakeGift()]
  async list(): Promise<Gift[]> {
    return this.output
  }
}

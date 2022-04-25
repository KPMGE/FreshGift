import { Gift } from "../../../src/domain/entities"
import { ListGift } from "../../../src/domain/useCases"
import { makeFakeGift } from "../../domain/mocks/gift"

export class ListGiftsServiceStub implements ListGift {
  output = [makeFakeGift(), makeFakeGift()]
  async execute(): Promise<Gift[]> {
    return this.output
  }
}


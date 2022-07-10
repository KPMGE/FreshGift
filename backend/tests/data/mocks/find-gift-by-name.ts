import { FindGiftByNameRepository } from "../../../src/data/contracts/gift/find-gift-by-name"
import { Gift } from "../../../src/domain/entities"

export class FindGiftByNameRepositorySpy implements FindGiftByNameRepository {
  name = ""
  gift = null
  async find(name: string): Promise<Gift> {
    this.name = name
    return this.gift
  }
}

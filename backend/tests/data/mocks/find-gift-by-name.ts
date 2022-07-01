import { FindGiftByNameRepository } from "../../../src/data/contracts/gift/find-gift-by-name"
import { Gift } from "../../../src/domain/entities"

export class FindGiftByNameRepositoryMock implements FindGiftByNameRepository {
  name = ""
  async find(name: string): Promise<Gift> {
    this.name = name
    return null
  }
}

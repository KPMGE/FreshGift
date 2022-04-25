import { SaveGiftRepository } from "../../../src/data/contracts"
import { Gift } from "../../../src/domain/entities"

export class SaveGiftRepositorySpy implements SaveGiftRepository {
  input
  output: Gift = {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    imageUrl: 'any_image_url',
    price: 100.1
  }
  async save(gift: Gift): Promise<Gift> {
    this.input = gift
    return this.output
  }
}

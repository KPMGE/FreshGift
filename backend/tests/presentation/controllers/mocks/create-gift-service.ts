import { Gift } from "../../../../src/domain/entities"
import { CreateGift } from "../../../../src/domain/useCases"

export class CreateGiftServiceSpy implements CreateGift {
  input
  output: Gift = {
    id: 'any_id',
    name: "any_name",
    price: 100.2,
    description: "any_description",
    imageUrl: "any_image_url"
  }
  async execute(gift: CreateGift.Props): Promise<Gift> {
    this.input = gift
    return this.output
  }
}


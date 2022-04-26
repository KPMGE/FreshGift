import { Gift } from "../../../src/domain/entities"

export const makeFakeGift = (): Gift => {
  return {
    id: 'any_id',
    name: 'any_name',
    price: 100.2,
    imageUrl: 'any_image_url',
    description: 'any_description'
  }
}


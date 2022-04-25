import { RequiredParameterValidation, ValidationComposite } from "../../../validation/validators";
import { GiftPriceValidator } from "../../../validation/validators/gift-price";

export const makeCreateGiftValidation = (): ValidationComposite => {
  const requiredFields = ['name', 'price', 'description', 'imageUrl']
  const validators = []
  for (const field of requiredFields) {
    validators.push(new RequiredParameterValidation(field))
  }
  validators.push(new GiftPriceValidator('price'))
  return new ValidationComposite(validators)
}

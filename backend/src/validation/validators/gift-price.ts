import { Validator } from "../../presentation/contracts";
import { InvalidGiftPriceError } from "../../presentation/errors/invalid-gift-price";

export class GiftPriceValidator implements Validator {
  constructor(private readonly fieldName: string) { }

  validate(input: any): Error {
    const price = input[this.fieldName]
    if (price <= 0) return new InvalidGiftPriceError()
  }
}

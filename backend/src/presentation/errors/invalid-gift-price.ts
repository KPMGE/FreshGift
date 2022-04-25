export class InvalidGiftPriceError extends Error {
  constructor() {
    super('the gift price must be greater than 0')
    this.name = 'InvalidGiftPriceError '
  }
}

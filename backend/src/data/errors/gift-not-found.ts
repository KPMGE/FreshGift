export class GiftNotFoundError extends Error {
  constructor() {
    super('gift not found!')
    super.name = 'GiftNotFoundError'
  }
}


export class GiftNameTakenError extends Error {
  constructor() {
    super('gift name already taken!')
    super.name = 'GiftNameTakenError'
  }
}

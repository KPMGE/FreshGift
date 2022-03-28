export class CannotDeleteGiftError extends Error {
  constructor() {
    super('Cannot delete gift')
    this.name = 'CannotDeleteGiftError'
  }
}

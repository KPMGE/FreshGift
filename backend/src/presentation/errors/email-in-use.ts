export class EmailInUseError extends Error {
  constructor() {
    super('The  given email is already in use')
    this.name = 'EmailInUseError '
  }
}

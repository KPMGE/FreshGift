export class PasswordsDontMatchError extends Error {
  constructor() {
    super('password and confirmPassword don\'t match')
    this.name = 'PasswordsDontMatchError '
  }
}

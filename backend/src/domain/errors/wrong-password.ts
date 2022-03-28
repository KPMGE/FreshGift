export class PasswordsDontMatchError extends Error {
  constructor() {
    super('password and confirmPassword don\'t mach')
    this.name = 'PasswordsDontMatchError '
  }
}

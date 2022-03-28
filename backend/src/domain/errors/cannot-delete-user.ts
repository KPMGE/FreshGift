export class CannotDeleteUserError extends Error {
  constructor() {
    super('Cannot delete user')
    this.name = 'CannotDeleteUserError'
  }
} 

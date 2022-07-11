import jwt from 'jsonwebtoken'
import { Encrypter } from '../../data/contracts'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) { }

  async encrypt(plainText: string): Promise<string> {
    return jwt.sign({ id: plainText }, this.secret)
  }
}

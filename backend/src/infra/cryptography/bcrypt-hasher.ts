import bcryptjs from 'bcryptjs'
import { HashComparer, Hasher } from "../../data/providers";

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) { }

  async hash(plainText: string): Promise<string> {
    return bcryptjs.hash(plainText, this.salt)
  }

  async compare(plainText: string, hashedInfo: string): Promise<boolean> {
    return bcryptjs.compare(plainText, hashedInfo)
  }
}

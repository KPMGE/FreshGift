import { Hasher } from "../../../src/data/contracts"

export class HasherSpy implements Hasher {
  input?: string
  output: string = 'hashed_password'

  async hash(plainText: string): Promise<string> {
    this.input = plainText
    return this.output
  }
}

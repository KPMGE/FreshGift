import { Encrypter } from "../../../src/data/contracts/cryptography/encrypter"

export class EncrypterSpy implements Encrypter {
  plainText?: string
  output = 'some_token'
  async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText
    return this.output
  }
}

import { Encrypter } from "../../../src/data/providers"

export class EncrypterSpy implements Encrypter {
  plainText?: string
  output = 'some_token'
  async encrypt(plainText: string): Promise<string> {
    this.plainText = plainText
    return this.output
  }
}

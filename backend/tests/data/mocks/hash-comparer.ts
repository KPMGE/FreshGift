import { HashComparer } from "../../../src/data/contracts"

export class HashComparerSpy implements HashComparer {
  plainText?: string
  hashedInfo?: string
  output: boolean = true
  async compare(plainText: string, hashedInfo: string): Promise<boolean> {
    this.plainText = plainText
    this.hashedInfo = hashedInfo
    return this.output
  }
}

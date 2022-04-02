import { HashComparer } from "../../../src/data/providers"

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

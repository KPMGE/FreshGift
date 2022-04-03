export interface HashComparer {
  compare(plainText: string, hashedInfo: string): Promise<boolean>
}

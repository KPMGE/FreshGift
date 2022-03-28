export interface TokenGeneratorProvider {
  generate(userId: string): string
}

export class IdGeneratorStub implements IdGenerator {
  output = "any_id"
  generate(): string {
    return this.output
  }
}

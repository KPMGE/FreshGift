import { RandomIdGeneratorProvider } from "../../../../src/data/providers";

export class RandomIdGeneratorProviderStub
  implements RandomIdGeneratorProvider
{
  generate(): string {
    return "any_valid_id";
  }
}

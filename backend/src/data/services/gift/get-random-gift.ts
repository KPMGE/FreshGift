import { GetRandomBook } from "../../../domain/useCases/gift";
import { GiftDTO } from "../../DTO";
import { GetRandomBookProvider } from "../../providers";

export class GetRandomBookService implements GetRandomBook {
  constructor(private readonly getRandomBookProvider: GetRandomBookProvider) {}

  async execute(): Promise<GiftDTO> {
    return this.getRandomBookProvider.get();
  }
}

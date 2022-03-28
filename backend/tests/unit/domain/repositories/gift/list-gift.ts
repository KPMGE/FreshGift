import { GiftDTO } from "../../../../../src/data/DTO";
import { ListGiftRepository } from "../../../../../src/data/contracts/gift";

export class ListGiftRepositorySpy implements ListGiftRepository {
  callsCount = 0;
  output: GiftDTO[] = [];

  async list(): Promise<GiftDTO[]> {
    this.callsCount++;
    return this.output;
  }
}

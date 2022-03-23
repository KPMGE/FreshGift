import { Gift } from "../.././../../../src/domain/entities";
import { SaveGiftRepository } from "../.././../../../src/data/contracts/gift";

export class SaveGiftRepositoryMock implements SaveGiftRepository {
  input: Gift;
  callsCount = 0;

  async save(gift: Gift): Promise<Gift> {
    this.input = gift;
    this.callsCount++;
    return gift;
  }
}

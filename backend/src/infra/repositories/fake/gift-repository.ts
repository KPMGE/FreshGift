import { SaveGiftRepository } from '../../../data/contracts/gift'
import { Gift } from '../../../domain/entities'

export class FakeSaveGiftRepository implements SaveGiftRepository {
  listGifts: Gift[] = []

  async save(gift: Gift): Promise<Gift> {
    this.listGifts.push(gift)
    return gift
  }
}


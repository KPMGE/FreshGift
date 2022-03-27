import { SaveGiftRepository } from '../../../data/contracts/gift'
import { DeleteUserRepository } from '../../../data/contracts/user'
import { Gift } from '../../../domain/entities'

let listGifts: Gift[] = []

export class FakeSaveGiftRepository implements SaveGiftRepository {

  async save(gift: Gift): Promise<Gift> {
    listGifts.push(gift)
    return gift
  }
}

export class FakeDeleteGiftRepository implements DeleteUserRepository {
  async delete(giftId: string): Promise<Gift> {
    const foundGift = listGifts.find(gift => gift.id === giftId)

    const newList = listGifts.filter(gift => gift.id !== giftId)
    listGifts = newList

    if (!foundGift) throw new Error('gift not found')

    return foundGift
  }
}

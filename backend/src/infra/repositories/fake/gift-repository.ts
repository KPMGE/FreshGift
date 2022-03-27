import { ListGiftRepository, SaveGiftRepository, UpdateGiftRepository } from '../../../data/contracts/gift'
import { GetGiftByIdRepository } from '../../../data/contracts/gift/get-gift-by-id-repository'
import { DeleteUserRepository } from '../../../data/contracts/user'
import { GiftDTO } from '../../../data/DTO'
import { Gift } from '../../../domain/entities'
import { GiftViewModel } from '../../../presentation/view-models'

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

export class FakeListGiftRepository implements ListGiftRepository {
  async list(): Promise<GiftViewModel[]> {
    return listGifts
  }
}

export class FakeGetGiftByIdRepository implements GetGiftByIdRepository {
  async getGift(giftId: string): Promise<GiftDTO | undefined> {
    return listGifts.find(gift => gift.id === giftId)
  }
}

export class FakeUpdateGiftRepository implements UpdateGiftRepository {
  async update(giftId: string): Promise<GiftDTO | null> {
    const foundGift = listGifts.find(gift => gift.id === giftId)
    return foundGift
  }
}

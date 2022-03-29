import { DeleteGiftRepository, ListGiftRepository, SaveGiftRepository, UpdateGiftRepository } from '../../../data/contracts/gift'
import { GetGiftByIdRepository } from '../../../data/contracts/gift/get-gift-by-id-repository'
import { GiftDTO } from '../../../data/DTO'
import { Gift } from '../../../domain/entities'
import { UpdateGift } from '../../../domain/useCases/gift'
import { GiftViewModel } from '../../../presentation/view-models'

let listGifts: Gift[] = []

export class FakeSaveGiftRepository implements SaveGiftRepository {

  async save(gift: Gift): Promise<Gift> {
    listGifts.push(gift)
    return gift
  }
}

export class FakeDeleteGiftRepository implements DeleteGiftRepository {
  async delete(giftId: string): Promise<Gift | undefined> {
    const foundGift = listGifts.find(gift => gift.id === giftId)

    const newList = listGifts.filter(gift => gift.id !== giftId)
    listGifts = newList

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
  async update(giftId?: string, newGift?: UpdateGift.Props): Promise<GiftDTO | undefined> {
    const foundGift = listGifts.find(gift => gift.id === giftId)
    if (!newGift) return undefined
    if (!foundGift) return undefined

    const index = listGifts.indexOf(foundGift)

    foundGift.name = newGift.name
    foundGift.price = newGift.price
    foundGift.imageUrl = newGift.imageUrl
    foundGift.description = newGift.description
    listGifts[index] = foundGift

    return foundGift
  }
}

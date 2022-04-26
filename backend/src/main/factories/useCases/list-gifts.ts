import { ListGiftsService } from "../../../data/services/gift/list-gifts"
import { FakeListGiftRepository } from "../../../infra/repositories"

export const makeListGiftsService = (): ListGiftsService => {
  const listGiftsRepo = new FakeListGiftRepository()
  const listService = new ListGiftsService(listGiftsRepo)
  return listService
}

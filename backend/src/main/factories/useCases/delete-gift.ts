import { DeleteGiftService } from "../../../data/services/gift/delete-gift";
import { DeleteGift } from "../../../domain/useCases";
import { FakeDeleteGiftRepository, FakeFindGiftByIdRepository } from "../../../infra/repositories";

export const makeDeleteGiftService = (): DeleteGift => {
  const deleteGiftRepo = new FakeDeleteGiftRepository()
  const findGiftRepo = new FakeFindGiftByIdRepository()
  const service = new DeleteGiftService(deleteGiftRepo, findGiftRepo)
  return service
}

import { CreateGiftService } from "../../../data/services";
import { UuidAdapter } from "../../../infra/providers/uuid-id-generator";
import { FakeFindGiftByNameRepository, FakeSaveGiftRepository } from "../../../infra/repositories";

export const makeCreateGift = (): CreateGiftService => {
  const saveGiftrepo = new FakeSaveGiftRepository()
  const findGiftByNameRepo = new FakeFindGiftByNameRepository()
  const idGenerator = new UuidAdapter()
  const service = new CreateGiftService(saveGiftrepo, idGenerator, findGiftByNameRepo)
  return service
}

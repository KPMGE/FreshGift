import { CreateGiftService } from "../../../data/services";
import { UuidAdapter } from "../../../infra/providers/uuid-id-generator";
import { FakeSaveGiftRepository } from "../../../infra/repositories";

export const makeCreateGift = (): CreateGiftService => {
  const repo = new FakeSaveGiftRepository()
  const idGenerator = new UuidAdapter()
  const service = new CreateGiftService(repo, idGenerator)
  return service
}

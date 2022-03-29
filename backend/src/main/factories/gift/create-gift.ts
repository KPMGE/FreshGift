import { RandomIdGeneratorProviderStub } from "../../../../tests/unit/domain/providers";
import { CreateGiftService } from "../../../data/services/gift";
import { FakeSaveGiftRepository } from "../../../infra/repositories";
import { Controller } from "../../../presentation/contracts/controller";
import { CreateGiftController } from "../../../presentation/controllers/gift";

export const makeCreateGifController = (): Controller => {
  const repo = new FakeSaveGiftRepository()
  const idGenerator = new RandomIdGeneratorProviderStub()
  const service = new CreateGiftService(repo, idGenerator)
  const controller = new CreateGiftController(service)
  return controller
} 

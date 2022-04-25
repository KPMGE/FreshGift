import { ListGift } from "../../../domain/useCases";
import { ListGiftRepository } from "../../contracts";
import { GiftDTO } from "../../DTO";

export class ListGiftsService implements ListGift {
  constructor(private readonly listGiftRepo: ListGiftRepository) { }
  async execute(): Promise<GiftDTO[]> {
    return await this.listGiftRepo.list()
  }
}

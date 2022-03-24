import { ListGiftRepository } from "../../contracts/gift";
import { GiftDTO } from "../../DTO";
import { ListGift } from "../../../domain/useCases/gift";

export class ListGiftService implements ListGift {
  constructor(private readonly listGiftRepository: ListGiftRepository) {}

  async execute(): Promise<GiftDTO[]> {
    return this.listGiftRepository.list();
  }
}

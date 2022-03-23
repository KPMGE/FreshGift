import { GiftDTO } from "../../DTO";
import { DeleteGiftRepository } from "../../contracts/gift";
import { DeleteGift } from "../../../domain/useCases/gift";

export class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) {}

  async execute(id: string): Promise<GiftDTO> {
    return this.deleteRepository.delete(id);
  }
}

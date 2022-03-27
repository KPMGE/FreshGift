import { GiftDTO } from "../../DTO";
import { DeleteGiftRepository } from "../../contracts/gift";
import { DeleteGift } from "../../../domain/useCases/gift";
import { MissingParameterError } from "../../../domain/errors";

export class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) { }

  async execute(id?: string): Promise<GiftDTO> {
    if (!id) throw new MissingParameterError('id')
    return this.deleteRepository.delete(id);
  }
}

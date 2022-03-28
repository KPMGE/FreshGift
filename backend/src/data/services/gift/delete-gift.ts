import { GiftDTO } from "../../DTO";
import { DeleteGiftRepository } from "../../contracts/gift";
import { DeleteGift } from "../../../domain/useCases/gift";
import { CannotDeleteGiftError, MissingParameterError } from "../../../domain/errors";

export class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) { }

  async execute(id?: string): Promise<GiftDTO | undefined> {
    if (!id) throw new MissingParameterError('id')
    const deletedGift = await this.deleteRepository.delete(id);
    if (!deletedGift) throw new CannotDeleteGiftError()
    return deletedGift
  }
}

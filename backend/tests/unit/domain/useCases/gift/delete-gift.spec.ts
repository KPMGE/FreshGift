import { Gift } from "../../../../../src/domain/entities";
import { DeleteGift } from "../../../../../src/domain/useCases/gift";
import { DeleteGiftRepository } from "../../../../../src/data/contracts/gift";

class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) {}

  async execute(id: string): Promise<Gift> {
    return this.deleteRepository.delete(id);
  }
}

class DeleteGiftRepositorySpy implements DeleteGiftRepository {
  giftId: string;
  callsCount = 0;
  output: Gift = {
    id: "any_gift_id",
    name: "any_gift_name",
    description: "any_gift_description",
    price: 0,
    imageUrl: "any_gift_image",
  };

  async delete(giftId: string): Promise<Gift> {
    this.callsCount++;
    this.giftId = giftId;
    return this.output;
  }
}

type SutTypes = {
  sut: DeleteGift;
  deleteRepository: DeleteGiftRepositorySpy;
};

const makeSut = (): SutTypes => {
  const deleteRepository = new DeleteGiftRepositorySpy();
  const sut = new DeleteGiftService(deleteRepository);

  return {
    sut,
    deleteRepository,
  };
};

describe("delete-gift", () => {
  const fakeGift = {
    id: "any_gift_id",
    name: "any_gift_name",
    description: "any_gift_description",
    price: 0,
    imageUrl: "any_gift_image",
  };

  it("should call delete repository with correct data.", async () => {
    const { sut, deleteRepository } = makeSut();

    await sut.execute(fakeGift.id);

    expect(deleteRepository.giftId).toBe(fakeGift.id);
  });

  it("should call repository only once", async () => {
    const { sut, deleteRepository } = makeSut();

    await sut.execute(fakeGift.id);

    expect(deleteRepository.callsCount).toBe(1);
  });
});

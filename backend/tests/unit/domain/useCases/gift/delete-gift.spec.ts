import { Gift } from "../../../../../src/domain/entities";

interface DeleteGift {
  execute(giftId: string): Promise<Gift>;
}

interface DeleteGiftRepository {
  delete(giftId: string): Promise<Gift>;
}

class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) {}

  async execute(id: string): Promise<Gift> {
    return this.deleteRepository.delete(id);
  }
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  giftId: string;
  output: Gift = {
    id: "any_gift_id",
    name: "any_gift_name",
    description: "any_gift_description",
    price: 0,
    imageUrl: "any_gift_image",
  };

  async delete(giftId: string): Promise<Gift> {
    this.giftId = giftId;
    return this.output;
  }
}

type SutTypes = {
  sut: DeleteGift;
  deleteRepository: DeleteGiftRepositoryMock;
};

const makeSut = (): SutTypes => {
  const deleteRepository = new DeleteGiftRepositoryMock();
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

    sut.execute(fakeGift.id);

    expect(deleteRepository.giftId).toBe(fakeGift.id);
  });

  it("should return the deleted gift", async () => {
    const { sut } = makeSut();

    const deletedGift = await sut.execute(fakeGift.id);

    expect(deletedGift).toEqual(fakeGift);
  });
});

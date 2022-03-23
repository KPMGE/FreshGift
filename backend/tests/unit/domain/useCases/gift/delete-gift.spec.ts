interface DeleteGift {
  execute(giftId: string): Promise<void>;
}

interface DeleteGiftRepository {
  delete(giftId: string): Promise<void>;
}

class DeleteGiftService implements DeleteGift {
  constructor(private readonly deleteRepository: DeleteGiftRepository) {}

  async execute(id: string): Promise<void> {
    this.deleteRepository.delete(id);
  }
}

class DeleteGiftRepositoryMock implements DeleteGiftRepository {
  giftId: string;
  async delete(giftId: string): Promise<void> {
    this.giftId = giftId;
  }
}

type SutTypes = {
  sut: DeleteGift;
  repositoryMock: DeleteGiftRepository;
};

const makeSut = () => {
  const deleteRepository = new DeleteGiftRepositoryMock();
  const sut = new DeleteGiftService(deleteRepository);

  return {
    sut,
    deleteRepository,
  };
};

describe("delete-gift", () => {
  const giftId = "any_gift_id";

  it("should call delete repository with correct data.", () => {
    const { sut, deleteRepository } = makeSut();

    sut.execute(giftId);

    expect(deleteRepository.giftId).toBe(giftId);
  });
});

interface UpdateGiftRepository {
  update(giftId: string): Promise<void>;
}

interface UpdateGift {
  execute(giftId: string): Promise<void>;
}

class UpdateGiftRepositoryMock implements UpdateGiftRepository {
  giftId: string;
  async update(giftId: string): Promise<void> {
    this.giftId = giftId;
  }
}

class UpdateGiftService implements UpdateGift {
  constructor(private readonly updateGiftRepository: UpdateGiftRepository) {}

  async execute(giftId: string): Promise<void> {
    await this.updateGiftRepository.update(giftId);
  }
}

type SutTypes = {
  sut: UpdateGiftService;
  updateGiftRepository: UpdateGiftRepositoryMock;
};

const makeSut = (): SutTypes => {
  const updateGiftRepository = new UpdateGiftRepositoryMock();
  const sut = new UpdateGiftService(updateGiftRepository);

  return {
    sut,
    updateGiftRepository,
  };
};

describe("update-gift", () => {
  const giftId: string = "any_gift_id";

  it("should call update repository with the right id", async () => {
    const { sut, updateGiftRepository } = makeSut();
    await sut.execute(giftId);

    expect(updateGiftRepository.giftId).toBe(giftId);
  });
});

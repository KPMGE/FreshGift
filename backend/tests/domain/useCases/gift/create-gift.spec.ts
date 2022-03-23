type Gift = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

interface SaveGiftRepository {
  save(gift: Gift): Promise<Gift>;
}

class SaveGiftRepositoryMock implements SaveGiftRepository {
  input: Gift;
  callsCount = 0;

  async save(gift: Gift): Promise<Gift> {
    this.input = gift;
    this.callsCount++;
    return gift;
  }
}

class CreateGift {
  constructor(private readonly saveGiftRepository: SaveGiftRepository) {}

  async execute(gift: Gift): Promise<Gift> {
    return this.saveGiftRepository.save(gift);
  }
}

type SutTypes = {
  sut: CreateGift;
  saveGiftRepository: SaveGiftRepositoryMock;
};

const makeSut = () => {
  const saveGiftRepository = new SaveGiftRepositoryMock();
  const sut = new CreateGift(saveGiftRepository);

  return {
    sut,
    saveGiftRepository,
  };
};

describe("create-gift", () => {
  it("should call repository with correct data.", () => {
    const gift = {
      id: "1",
      name: "gift",
      price: 10,
      description: "description",
      image_url: "image_url",
    };

    const { sut, saveGiftRepository } = makeSut();

    sut.execute(gift);

    expect(saveGiftRepository.input).toBe(gift);
  });
});

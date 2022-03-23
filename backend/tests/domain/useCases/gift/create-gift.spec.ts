import { Gift } from ".././../../../src/domain/entities";
import { SaveGiftRepository } from ".././../../../src/domain/repositories/gift";
import { SaveGiftRepositoryMock } from "../../repositories/gift";

interface CreateGift {
  execute(gift: Gift): Promise<Gift>;
}

class CreateGiftService implements CreateGift {
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
  const sut = new CreateGiftService(saveGiftRepository);

  return {
    sut,
    saveGiftRepository,
  };
};

describe("create-gift", () => {
  const gift = {
    id: "1",
    name: "gift",
    price: 10,
    description: "description",
    image_url: "image_url",
  };

  it("should call repository with correct data.", () => {
    const { sut, saveGiftRepository } = makeSut();

    sut.execute(gift);

    expect(saveGiftRepository.input).toBe(gift);
  });

  it("should call repository only once", () => {
    const { sut, saveGiftRepository } = makeSut();

    sut.execute(gift);

    expect(saveGiftRepository.callsCount).toBe(1);
  });

  it("return created gift", async () => {
    const { sut } = makeSut();

    const createdGift = await sut.execute(gift);

    expect(createdGift).toBe(gift);
  });
});

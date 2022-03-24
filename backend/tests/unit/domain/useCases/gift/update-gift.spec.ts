import { Gift } from "../../../../../src/domain/entities";
import { UpdateGift } from "../../../../../src/domain/useCases/gift";
import { UpdateGiftRepository } from "../../../../../src/data/contracts/gift";

class UpdateGiftRepositorySpy implements UpdateGiftRepository {
  giftId: string;
  callsCount: number = 0;
  output: Gift = {
    id: "any_gift_id",
    name: "any_name",
    description: "any_description",
    price: 1,
    imageUrl: "any_image",
  };

  async update(giftId: string): Promise<Gift> {
    this.giftId = giftId;
    this.callsCount++;
    return this.output;
  }
}

class UpdateGiftService implements UpdateGift {
  constructor(private readonly updateGiftRepository: UpdateGiftRepository) {}

  async execute(giftId: string): Promise<Gift> {
    return await this.updateGiftRepository.update(giftId);
  }
}

type SutTypes = {
  sut: UpdateGiftService;
  updateGiftRepository: UpdateGiftRepositorySpy;
};

const makeSut = (): SutTypes => {
  const updateGiftRepository = new UpdateGiftRepositorySpy();
  const sut = new UpdateGiftService(updateGiftRepository);

  return {
    sut,
    updateGiftRepository,
  };
};

describe("update-gift", () => {
  const fakeGift: Gift = {
    id: "any_gift_id",
    name: "any_name",
    description: "any_description",
    price: 1,
    imageUrl: "any_image",
  };

  it("should call update repository with the right id", async () => {
    const { sut, updateGiftRepository } = makeSut();
    await sut.execute(fakeGift.id);

    expect(updateGiftRepository.giftId).toBe(fakeGift.id);
  });

  it("should return the updated gift", async () => {
    const { sut } = makeSut();
    const updatedGift = await sut.execute(fakeGift.id);

    expect(updatedGift).toEqual(fakeGift);
  });

  it("should call repository only once", async () => {
    const { sut, updateGiftRepository } = makeSut();
    await sut.execute(fakeGift.id);

    expect(updateGiftRepository.callsCount).toEqual(1);
  });
});

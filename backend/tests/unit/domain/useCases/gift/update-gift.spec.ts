import { Gift } from "../../../../../src/domain/entities";
import { UpdateGiftService } from "../../../../../src/data/services/gift";
import { UpdateGiftRepositorySpy } from "../../repositories/gift/";

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

  it("should return null if no gift is found", async () => {
    const { sut, updateGiftRepository } = makeSut();
    updateGiftRepository.output = undefined

    const foundGift = await sut.execute(fakeGift.id);

    expect(foundGift).toBeNull();
  });
});

import { SaveGiftRepositoryMock } from "../../repositories/gift";
import { CreateGift } from "../../../../../src/domain/useCases/gift";
import { CreateGiftService } from "../../../../../src/data/services/gift";

type SutTypes = {
  sut: CreateGift;
  saveGiftRepository: SaveGiftRepositoryMock;
};

const makeSut = (): SutTypes => {
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

import { SaveGiftRepositoryMock } from "../../repositories/gift";
import { CreateGift } from "../../../../../src/domain/useCases/gift";
import { CreateGiftService } from "../../../../../src/data/services/gift";
import { MissingParameterError } from "../../../../../src/domain/errors";

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
    imageUrl: "image_url",
  };

  it("should throw error if no gift is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute(undefined);

    expect(promise).rejects.toThrowError(new MissingParameterError('gift'));
  });

  it("should throw error if no gift id is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...gift, id: undefined });

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.id'));
  });

  it("should throw error if no gift name is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...gift, name: undefined });

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.name'));
  });

  it("should throw error if no gift description is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...gift, description: undefined });

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.description'));
  });

  it("should throw error if no gift imageUrl is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ ...gift, imageUrl: undefined });

    expect(promise).rejects.toThrowError(new MissingParameterError('gift.imageUrl'));
  });

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

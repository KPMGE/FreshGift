import { Gift } from "../../../../../src/domain/entities";
import { ListGift } from "../../../../../src/domain/useCases/gift";
import { ListGiftRepository } from "../../../../../src/data/contracts/gift";

class ListGiftService implements ListGift {
  constructor(private readonly listGiftRepository: ListGiftRepository) {}

  async execute(): Promise<Gift[]> {
    return this.listGiftRepository.list();
  }
}

class ListGiftRepositorySpy implements ListGiftRepository {
  callsCount = 0;
  output: Gift[] = [];

  async list(): Promise<Gift[]> {
    this.callsCount++;
    return this.output;
  }
}

type SutTypes = {
  sut: ListGift;
  listGiftRepository: ListGiftRepositorySpy;
};

const makeSut = (): SutTypes => {
  const listGiftRepository = new ListGiftRepositorySpy();
  const sut = new ListGiftService(listGiftRepository);
  return {
    sut,
    listGiftRepository,
  };
};

describe("list-gift", () => {
  it("should return an empty array if there is no gift in the list", async () => {
    const { sut } = makeSut();

    const gifts = await sut.execute();

    expect(gifts).toEqual([]);
  });

  it("should call repository only once", async () => {
    const { sut, listGiftRepository } = makeSut();

    await sut.execute();

    expect(listGiftRepository.callsCount).toBe(1);
  });

  it("should return a valid list of gifts", async () => {
    const fakeGiftList = [
      {
        id: "any_gift_id",
        name: "any_name",
        description: "any_description",
        price: 10,
        imageUrl: "any_url",
      },
    ];

    const { sut, listGiftRepository } = makeSut();

    listGiftRepository.output = fakeGiftList;

    const gifts = await sut.execute();

    expect(gifts).toEqual(fakeGiftList);
  });
});

import { Gift } from "../../../../../src/domain/entities";

interface ListGift {
  execute(): Promise<Gift[] | []>;
}

interface ListGiftRepository {
  list(): Promise<Gift[] | []>;
}

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

describe("list-gift", () => {
  it("should return an empty array if there is no gift in the list", async () => {
    const listGiftRepository = new ListGiftRepositorySpy();
    const sut = new ListGiftService(listGiftRepository);

    const gifts = await sut.execute();

    expect(gifts).toEqual([]);
  });
});

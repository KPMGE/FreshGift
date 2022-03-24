import { Gift } from "../../../../../src/domain/entities";
import { GetRandomBook } from "../../../../../src/domain/useCases/gift";
import { GetRandomBookProvider } from "../../../../../src/data/providers";

class GetRandomBookProviderStub implements GetRandomBookProvider {
  output: Gift = {
    id: "any_gift_id",
    name: "gift",
    price: 1,
    imageUrl: "imageUrl",
    description: "description",
  };

  async get(): Promise<Gift> {
    return this.output;
  }
}

class GetRandomBookService implements GetRandomBook {
  constructor(private readonly getRandomBookProvider: GetRandomBookProvider) {}

  async execute(): Promise<Gift> {
    return this.getRandomBookProvider.get();
  }
}

describe("get-random-gift", () => {
  it("should return a random gift", async () => {
    const getRandomGiftProvider = new GetRandomBookProviderStub();
    const sut = new GetRandomBookService(getRandomGiftProvider);

    const gift = await sut.execute();

    expect(gift).toBeTruthy();
    expect(gift).toHaveProperty("id");
    expect(gift).toHaveProperty("description");
    expect(gift).toHaveProperty("name");
    expect(gift).toHaveProperty("price");
    expect(gift).toHaveProperty("imageUrl");
  });
});

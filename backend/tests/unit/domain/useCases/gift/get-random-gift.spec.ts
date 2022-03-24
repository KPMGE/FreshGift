import { GetRandomBookService } from "../../../../../src/data/services/gift/get-random-gift";
import { GetRandomBookProviderStub } from "../../repositories/gift/get-random-gift";

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

import { GetRandomGiftService } from "../../../../../src/data/services/gift";
import { GetRandomGiftProviderStub } from "../../repositories/gift/get-random-gift";

describe("get-random-gift", () => {
  it("should return a random gift inside the given range", async () => {
    const getRandomGiftProvider = new GetRandomGiftProviderStub();
    const sut = new GetRandomGiftService(getRandomGiftProvider);

    const gift = await sut.execute({ min: 0, max: 200 });

    expect(gift?.price).toBeGreaterThanOrEqual(0);
    expect(gift?.price).toBeLessThanOrEqual(200);
    expect(gift).toBeTruthy();
    expect(gift).toHaveProperty("description");
    expect(gift).toHaveProperty("name");
    expect(gift).toHaveProperty("price");
    expect(gift).toHaveProperty("imageUrl");
  });
});

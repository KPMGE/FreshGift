import { Gift } from "../../entities";

export interface GetRandomBook {
  execute(): Promise<Gift>;
}

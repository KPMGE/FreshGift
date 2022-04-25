import { Gift } from "../../entities";

export interface ListGift {
  execute(): Promise<Gift[]>;
}

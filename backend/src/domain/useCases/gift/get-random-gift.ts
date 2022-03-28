import { Gift } from "../../entities";

export interface GetRandomGift {
  execute(input: GetRandomGift.Props): Promise<GetRandomGift.Result | undefined>
}

export namespace GetRandomGift {
  export type Props = {
    min: number
    max: number
  }
  export type Result = Omit<Gift, 'id'>
}

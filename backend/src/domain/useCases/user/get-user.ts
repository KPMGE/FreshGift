import { User } from "../../entities";

export interface GetUser {
  execute(userId: string): Promise<User>
}

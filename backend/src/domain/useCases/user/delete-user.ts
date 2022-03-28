import { User } from "../../entities";

export interface DeleteUser {
  execute(userId?: string): Promise<User>
}

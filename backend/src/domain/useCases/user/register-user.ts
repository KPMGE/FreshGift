import { User } from "../../entities";

export interface RegisterUser {
  execute(user?: User): Promise<string>
}

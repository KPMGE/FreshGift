import { RegisterUserService } from "../../../data/services/user";

export interface RegisterUser {
  execute(user?: RegisterUserService.Props): Promise<string>
}

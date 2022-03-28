import { DeleteUserRepository } from "../../../../../src/data/contracts/user";
import { UserDTO } from "../../../../../src/data/DTO";

export class DeleteUserRepositorySpy implements DeleteUserRepository {
  input?: string;
  output?: UserDTO = {
    id: "any_user_id",
    name: "any_name",
    email: "any_email@gmail.com",
    password: "any_password",
    confirmPassword: "any_password",
    userName: "any_user_name",
    savedGifts: [],
  };

  async delete(userId: string): Promise<UserDTO | undefined> {
    this.input = userId;
    return this.output;
  }
}

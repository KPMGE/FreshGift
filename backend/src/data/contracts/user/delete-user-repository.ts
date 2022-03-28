import { UserDTO } from "../../DTO";

export interface DeleteUserRepository {
  delete(userId: string): Promise<UserDTO | undefined>;
}

import { UserDTO } from "../../DTO";

export interface GetUserRepository {
  get(userId: string): Promise<UserDTO>
}

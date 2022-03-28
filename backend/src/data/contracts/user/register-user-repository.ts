import { UserDTO } from "../../DTO";

export interface RegisterUserRepository {
  register(user: UserDTO): Promise<void>;
}

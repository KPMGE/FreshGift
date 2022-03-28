import { DeleteUserRepository, RegisterUserRepository } from "../../../data/contracts/user";
import { UserDTO } from "../../../data/DTO";
import { User } from "../../../domain/entities";

let listUsers: UserDTO[] = []

export class FakeRegisterUserRepository implements RegisterUserRepository {
  async register(user: User): Promise<void> {
    listUsers.push(user)
  }
}

export class FakeDeleteUserRepository implements DeleteUserRepository {
  async delete(userId: string): Promise<User | undefined> {
    const foundUser = listUsers.find(user => user.id === userId)
    listUsers = listUsers.filter(user => user.id !== userId)
    return foundUser
  }
}

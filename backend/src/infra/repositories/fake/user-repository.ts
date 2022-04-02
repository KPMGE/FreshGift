import { DeleteUserRepository, GetUserRepository } from "../../../data/contracts/user";
import { ListUsersRepository } from "../../../data/contracts/user/list-users-repository";
import { UserDTO } from "../../../data/DTO";
import { User } from "../../../domain/entities";
import { ListUser } from "../../../domain/useCases/user";

let listUsers: UserDTO[] = []

export class FakeListUsersRepository implements ListUsersRepository {
  async list(): Promise<ListUser.Result[]> {
    const result = listUsers.map(user => {
      const { password, confirmPassword, ...result } = user // removes the properties password and confirmPassword 
      return result
    })

    return result
  }
}

export class FakeGetUserReposioty implements GetUserRepository {
  async get(userId: string): Promise<User | undefined> {
    return listUsers.find(user => user.id === userId)
  }
}

export class FakeDeleteUserRepository implements DeleteUserRepository {
  async delete(userId: string): Promise<User | undefined> {
    const foundUser = listUsers.find(user => user.id === userId)
    listUsers = listUsers.filter(user => user.id !== userId)
    return foundUser
  }
}

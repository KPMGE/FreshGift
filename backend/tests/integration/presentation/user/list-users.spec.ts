import { ListUsersService } from "../../../../src/data/services/user"
import { ListUser } from "../../../../src/domain/useCases/user"
import { FakeListUsersRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class ListUsersController implements Controller {
  constructor(private readonly listUsersService: ListUser) { }

  async handle(): Promise<HttpResponse<ListUser.Result[]>> {
    const listUsers = await this.listUsersService.execute()
    return ok(listUsers)
  }
}

describe('list-users', () => {
  it('should return a HttpResponse with an empty array if no users were registered', async () => {
    const repository = new FakeListUsersRepository()
    const service = new ListUsersService(repository)
    const sut = new ListUsersController(service)

    const response = await sut.handle()

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([])
  })
})

import { ListUsersService } from "../../../../src/data/services/user"
import { ListUser } from "../../../../src/domain/useCases/user"
import { FakeListUsersRepository, FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class ListUsersController implements Controller {
  constructor(private readonly listUsersService: ListUser) { }

  async handle(): Promise<HttpResponse<ListUser.Result[]>> {
    const listUsers = await this.listUsersService.execute()
    return ok(listUsers)
  }
}

type SutTypes = {
  sut: ListUsersController
}

const makeSut = (): SutTypes => {
  const repository = new FakeListUsersRepository()
  const service = new ListUsersService(repository)
  const sut = new ListUsersController(service)

  return {
    sut
  }
}

describe('list-users', () => {
  it('should return a HttpResponse with an empty array if no users were registered', async () => {
    const { sut } = makeSut()
    const response = await sut.handle()

    expect(response.statusCode).toBe(200)
    expect(response.data).toEqual([])
  })

  it('should return an HttpResponse with a valid list of usuer', async () => {
    const registerUser = new FakeRegisterUserRepository()
    await registerUser.register({
      id: 'any_user_id',
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
      userName: 'any_username',
      savedGifts: [],
      confirmPassword: 'any_password'
    })

    const { sut } = makeSut()
    const response = await sut.handle()

    expect(response.statusCode).toBe(200)
    expect(response.data.length).toBe(1)
    expect(response.data[0]).toHaveProperty('id')
    expect(response.data[0]).toHaveProperty('name')
    expect(response.data[0]).toHaveProperty('userName')
    expect(response.data[0]).toHaveProperty('email')
    expect(response.data[0]).toHaveProperty('savedGifts')
    expect(response.data[0]).not.toHaveProperty('password')
    expect(response.data[0]).not.toHaveProperty('confirmPassword')
  })
})

import { UserDTO } from "../../../../src/data/DTO"
import { DeleteUserService } from "../../../../src/data/services/user"
import { DeleteUser } from "../../../../src/domain/useCases/user"
import { FakeDeleteUserRepository, FakeRegisterUserRepository } from "../../../../src/infra/repositories/fake/user-repository"
import { HttpRequest, HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"

class DeleteUserController implements Controller {
  constructor(private readonly deleteUserService: DeleteUser) { }

  async handle(req?: HttpRequest<{ userId: string }>): Promise<HttpResponse<UserDTO>> {
    const deletedUser = await this.deleteUserService.execute(req?.body?.userId)

    return ok(deletedUser)
  }
}

type SutTypes = {
  sut: DeleteUserController
}

const makeSut = (): SutTypes => {
  const repo = new FakeDeleteUserRepository()
  const service = new DeleteUserService(repo)
  const sut = new DeleteUserController(service)

  return {
    sut
  }
}

describe('delete-user', () => {
  const fakeUser: UserDTO = {
    id: 'any_user_id',
    name: 'any_user_name',
    email: 'any_valid_email@gmail.com',
    password: 'any_password',
    userName: 'any_username',
    confirmPassword: 'any_password',
    savedGifts: []
  }

  const fakeRequest: HttpRequest<{ userId: string }> = {
    body: {
      userId: 'any_user_id'
    }
  }

  it('should return HttpResponse with deleted user', async () => {
    // save a user in the fake db
    const registerUserRepository = new FakeRegisterUserRepository()
    await registerUserRepository.register(fakeUser)

    const { sut } = makeSut()

    const deletedUser = await sut.handle(fakeRequest)

    expect(deletedUser.statusCode).toBe(200)
    expect(deletedUser.data).toEqual(fakeUser)
  })
})

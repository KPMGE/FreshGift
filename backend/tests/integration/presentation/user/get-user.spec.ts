import { GetUserService } from "../../../../src/data/services/user/get-user"
import { GetUser } from "../../../../src/domain/useCases/user"
import { HttpRequest, HttpResponse, ok } from "../../../../src/presentation/contracts"
import { Controller } from "../../../../src/presentation/contracts/controller"
import { GetUserRepositorySpy } from "../../../unit/domain/repositories/user/get-user"

class GetUserByIdController implements Controller {
  constructor(private readonly getUserService: GetUser) { }

  async handle(req?: HttpRequest): Promise<HttpResponse<GetUserService.Result>> {
    const foundUser = await this.getUserService.execute(req?.params.userId)
    return ok(foundUser)
  }
}

describe('get-user', () => {
  const fakeUserId = 'any_user_id'
  const fakeRequest: HttpRequest = {
    params: {
      userId: fakeUserId
    }
  }

  it('should return a valid user', async () => {
    const repo = new GetUserRepositorySpy()
    const service = new GetUserService(repo)
    const sut = new GetUserByIdController(service)

    const user = await sut.handle(fakeRequest)

    expect(user.statusCode).toBe(200)
    expect(user.data).toBeTruthy()
  })
})

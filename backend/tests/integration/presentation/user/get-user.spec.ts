import { GetUserService } from "../../../../src/data/services/user/get-user"
import { GetUserRepositorySpy } from "../../../unit/domain/repositories/user/get-user"

describe('get-user', () => {
  it('should return a valid user', async () => {
    const repo = new GetUserRepositorySpy()
    const getUserByIdService = new GetUserService()
    const sut = new GetUserByIdController()
  })
})

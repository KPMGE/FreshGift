import { ListUsersService } from "../../../../../src/data/services/user"
import { ListUsersRepositorySpy } from "../../repositories/user"

type SutTypes = {
  sut: ListUsersService,
  repositorySpy: ListUsersRepositorySpy
}

const makeSut = (): SutTypes => {
  const repositorySpy = new ListUsersRepositorySpy()
  const sut = new ListUsersService(repositorySpy)

  return {
    sut,
    repositorySpy
  }
}

describe('list-users', () => {
  it('should call repository only once', async () => {
    const { sut, repositorySpy } = makeSut()

    await sut.execute()

    expect(repositorySpy.callsCount).toBe(1)
  })

  it('should return and empty array if there is no users in the repository', async () => {
    const { sut, repositorySpy } = makeSut()
    repositorySpy.users = []

    const users = await sut.execute()

    expect(users).toEqual([])
  })

  it('should return a list of valid users', async () => {
    const { sut } = makeSut()

    const users = await sut.execute()

    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('email')
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('userName')
    expect(users[0]).toHaveProperty('savedGifts')
  })
})

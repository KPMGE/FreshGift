import { UpdateTokenRepository } from "../../../src/data/contracts"

export class UpdateTokenRepositoryMock implements UpdateTokenRepository {
  id?: string
  token?: string
  async update(id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

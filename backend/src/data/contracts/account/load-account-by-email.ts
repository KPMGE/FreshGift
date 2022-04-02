export interface LoadAccountByEmailRepository {
  load(email: string): Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}

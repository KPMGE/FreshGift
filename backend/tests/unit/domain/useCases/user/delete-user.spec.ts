interface DeleteUserRepository {
  delete(userId: string): Promise<void>;
}

interface DeleteUser {
  execute(userId: string): Promise<void>;
}

class DeleteUserRepositoryMock implements DeleteUserRepository {
  input?: string;

  async delete(userId: string): Promise<void> {
    this.input = userId;
  }
}

class DeleteUserService implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}
  async execute(userId: string): Promise<void> {
    this.deleteUserRepository.delete(userId);
  }
}

describe("delete-user", () => {
  it("should call repository with right userId", async () => {
    const userId = "any_user_id";

    const deleteUserRepo = new DeleteUserRepositoryMock();
    const sut = new DeleteUserService(deleteUserRepo);

    await sut.execute(userId);

    expect(deleteUserRepo.input).toBe(userId);
  });
});

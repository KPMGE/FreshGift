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

type SutTypes = {
  sut: DeleteUser;
  deleteUserRepositoryMock: DeleteUserRepositoryMock;
};

const makeSut = (): SutTypes => {
  const deleteUserRepositoryMock = new DeleteUserRepositoryMock();
  const sut = new DeleteUserService(deleteUserRepositoryMock);
  return {
    sut,
    deleteUserRepositoryMock,
  };
};

describe("delete-user", () => {
  it("should call repository with right userId", async () => {
    const { sut, deleteUserRepositoryMock } = makeSut();
    const userId = "any_user_id";

    await sut.execute(userId);

    expect(deleteUserRepositoryMock.input).toBe(userId);
  });
});

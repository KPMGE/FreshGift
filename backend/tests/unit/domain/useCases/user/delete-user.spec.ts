import { User } from "../../../../../src/domain/entities";
import { MissingParameterError } from "../../../../../src/domain/errors";
import { DeleteUser } from "../../../../../src/domain/useCases/user";

interface DeleteUserRepository {
  delete(userId: string): Promise<User>;
}

class DeleteUserRepositorySpy implements DeleteUserRepository {
  input?: string;
  output: User = {
    id: "any_user_id",
    name: "any_name",
    email: "any_email@gmail.com",
    password: "any_password",
    confirmPassword: "any_password",
    userName: "any_user_name",
    savedGifts: [],
  };

  async delete(userId: string): Promise<User> {
    this.input = userId;
    return this.output;
  }
}

class DeleteUserService implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new MissingParameterError("userId");
    }

    return this.deleteUserRepository.delete(userId);
  }
}

type SutTypes = {
  sut: DeleteUser;
  deleteUserRepositorySpy: DeleteUserRepositorySpy;
};

const makeSut = (): SutTypes => {
  const deleteUserRepositorySpy = new DeleteUserRepositorySpy();
  const sut = new DeleteUserService(deleteUserRepositorySpy);
  return {
    sut,
    deleteUserRepositorySpy,
  };
};

describe("delete-user", () => {
  it("should call repository with right userId", async () => {
    const { sut, deleteUserRepositorySpy } = makeSut();
    const userId = "any_user_id";

    await sut.execute(userId);

    expect(deleteUserRepositorySpy.input).toBe(userId);
  });

  it("should throw an error if no userId is not provided", async () => {
    const { sut } = makeSut();

    const promise = sut.execute("");

    await expect(promise).rejects.toThrowError(
      new MissingParameterError("userId")
    );
  });

  it("should return the deleted user", async () => {
    const { sut, deleteUserRepositorySpy } = makeSut();

    const deletedUser = await sut.execute("any_user_id");

    expect(deletedUser).toEqual(deleteUserRepositorySpy.output);
  });
});

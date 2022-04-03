import { Controller } from "../../../presentation/contracts"
import { SignUpController } from "../../../presentation/controllers"
import { makeAuthentication } from "../useCases"
import { makeAddAccount } from "../useCases/add-account-factory"
import { makeSignUpValidation } from "./signup-validation"

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeAddAccount(), makeAuthentication(), makeSignUpValidation())
  return controller
}

import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeSignUpController } from "../factories/controllers"

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}

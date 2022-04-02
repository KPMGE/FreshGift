import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeRegisterUserController } from "../factories";

export default (router: Router): void => {
  router.post('/users/register', expressRouteAdapter(makeRegisterUserController()))
}

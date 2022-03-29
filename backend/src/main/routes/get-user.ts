import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeGetUserController } from "../factories/user/get-user";

export default (router: Router): void => {
  router.get('/users/get/:userId', expressRouteAdapter(makeGetUserController()))
}

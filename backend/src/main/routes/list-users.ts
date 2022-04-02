import { Router } from "express"
import { expressRouteAdapter } from "../adapters"
import { makeListUsersController } from "../factories"

export default (router: Router): void => {
  router.get('/users/list', expressRouteAdapter(makeListUsersController()))
}
